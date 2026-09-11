import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ErrorExceptionFilter } from 'src/common/filters/error-exception.filter';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      autoLoadEntities: true, //carrega entidades sem precisar especificalas
      synchronize: true, //sincorniza tudo aqui com o bg (não usar em PROD)
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: 'recados',
      method: RequestMethod.ALL,
    });
  }
}

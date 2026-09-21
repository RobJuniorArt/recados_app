import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['env/.env'],
      // ignoreEnvFile: false,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES), //carrega entidades sem precisar especificalas
      synchronize: Boolean(process.env.DB_SYNCHRONIZE), //sincorniza tudo aqui com o bg (não usar em PROD)
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

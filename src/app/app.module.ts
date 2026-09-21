import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from '../recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: ['env/.env'],
      // ignoreEnvFile: false,
      // validationSchema: Joi.object({
      //   //DB_TYPE: Joi.required(),
      // }) as any,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
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
    // TypeOrmModule.forRootAsync({
    //   imports: [],
    //   inject: [],
    //   useFactory: async () => (configService: ConfigService) => {
    //     return {
    //       type: configService.get<'postgres'>('database.type'),
    //       host: configService.get<string>('database.host'),
    //       port: configService.get<number>('database.port'),
    //       username: configService.get<string>('database.username'),
    //       database: configService.get<string>('database.database'),
    //       password: configService.get<string>('database.password'),
    //       autoLoadEntities: configService.get<boolean>(
    //         'database.autoLoadEntities',
    //       ),
    //       synchronize: configService.get<boolean>('database.synchonize'),
    //     };
    //   },
    // }),
    // RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

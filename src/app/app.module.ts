import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import appConfig from './app.config';
import { RecadosModule } from 'src/recados/recados.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forFeature(appConfig),
    //TypeOrmModule.forRoot({,
    //   type: process.env.DB_TYPE as 'postgres',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   username: process.env.DB_USER,
    //   database: process.env.DB_NAME,
    //   password: process.env.DB_PASS,
    //   autoLoadEntities: Boolean(process.env.DB_AUTOLOADENTITIES), //carrega entidades sem precisar especificalas
    //   synchronize: Boolean(process.env.DB_SYNCHRONIZE), //sincorniza tudo aqui com o bg (não usar em PROD)
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],
      inject: [appConfig.KEY],
      useFactory: async (appConfiguration: ConfigType<typeof appConfig>) => {
        return {
          type: appConfiguration.database.type,
          host: appConfiguration.database.host,
          port: appConfiguration.database.port,
          username: appConfiguration.database.username,
          database: appConfiguration.database.database,
          password: appConfiguration.database.password,
          autoLoadEntities: appConfiguration.database.autoLoadEntities,
          synchronize: appConfiguration.database.synchronize,
        };
      },
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

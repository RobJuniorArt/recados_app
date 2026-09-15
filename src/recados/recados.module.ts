import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtilMock, RecadosUtils } from './recados.utils';
import { SERVER_NAME } from 'src/constants/server-name.constante';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils, // token
      useValue: new RecadosUtilMock(), // valor ser usada
    },
    {
      provide: SERVER_NAME,
      useValue: 'My name is NestJS',
    },
  ],
  exports: [RecadosUtils, SERVER_NAME],
})
export class RecadosModule {}

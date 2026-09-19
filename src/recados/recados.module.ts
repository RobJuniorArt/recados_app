import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';
import { MyDynamicModule } from 'src/my-dynamic/my-dinamic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
    MyDynamicModule.register({
      apiKey: 'aqui vem a api ky',
      apiUrl: 'http://localhost:3030',
    }),
  ],
  controllers: [RecadosController],
  providers: [RecadosService, RecadosUtils],
  exports: [RecadosUtils],
})
export class RecadosModule {}

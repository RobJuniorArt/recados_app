import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { MY_DYNAMIC_CONFIG } from 'src/my-dynamic/my-dinamic.module';
import type { MyDynamicModuleConfigs } from 'src/my-dynamic/my-dinamic.module';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    @Inject(MY_DYNAMIC_CONFIG)
    private readonly myDynamicConfigs: MyDynamicModuleConfigs,
  ) {
    console.log(myDynamicConfigs);
  }

  //encontrar todos os recados
  @Get()
  async findAll(@Query() paginationDto: paginationDto) {
    const recados = await this.recadosService.findAll(paginationDto);
    return recados;
  }

  //encontrar um recado
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(+id);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}

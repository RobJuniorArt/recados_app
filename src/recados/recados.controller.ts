import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  //encontrar todos os recados
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseInterceptors(AddHeaderInterceptor)
  async findAll(@Query() paginationDto: paginationDto) {
    //return this.recadosService.findAll();
    const recados = await this.recadosService.findAll(paginationDto);
    return recados;
  }

  //encontrar todos os recados
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
    console.log(id, typeof id);
    return this.recadosService.remove(id);
  }
}

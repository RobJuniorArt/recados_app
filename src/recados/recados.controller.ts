import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { paginationDto } from 'src/common/dto/pagination.dto';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  //encontrar todos os recados
  @Get()
  async findAll(@Query() paginationDto: paginationDto) {
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
    // console.log(id, typeof id);
    return this.recadosService.remove(id);
  }
}

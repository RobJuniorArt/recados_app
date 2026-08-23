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
} from '@nestjs/common';
import { RecadosService } from './recados.service';

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  //encontrar todos os recados
  @HttpCode(HttpStatus.NOT_FOUND)
  @Get()
  findAll(@Query() pagination: any) {
    //const { limit = 10, offset = 0 } = pagination;
    //return `Essa rota retorna todos os recados. Limit: ${limit}, Offset: ${offset} `;

    return this.recadosService.findAll();
  }

  //encontrar todos os recados
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.recadosService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    this.recadosService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.recadosService.remove(id);
  }
}

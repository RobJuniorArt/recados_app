import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  //encontrar todos os recados
  @HttpCode(HttpStatus.NOT_FOUND)
  @Get()
  findAll() {
    return 'Essa rota retorna todos os recados';
  }

  //encontrar todos os recados
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `Essa rota retorna o recado ID: ${id}`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }
}

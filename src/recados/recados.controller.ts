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

@Controller('recados')
export class RecadosController {
  //encontrar todos os recados
  @HttpCode(HttpStatus.NOT_FOUND)
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;

    return `Essa rota retorna todos os recados. Limit: ${limit}, Offset: ${offset} `;
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `id: ${id} deletado com sucesso.`;
  }
}

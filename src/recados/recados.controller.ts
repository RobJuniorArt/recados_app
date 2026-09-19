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
import { RecadosUtils } from './recados.utils';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import {
  ONLY_LOWERCASE_LETTERS_REGEX,
  REMOVE_SPACE_REGEX,
} from './recados.constante';
import { OnlyLowerCaseLettersRegex } from 'src/common/regex/only-lowercase-letters.regex';

@Controller('recados')
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    private readonly recadosUtils: RecadosUtils,
    @Inject(REMOVE_SPACE_REGEX)
    private readonly removeSpacesRegex: RemoveSpacesRegex,
    @Inject(ONLY_LOWERCASE_LETTERS_REGEX)
    private readonly onlyLowerCaseLettersRegex: OnlyLowerCaseLettersRegex,
  ) {}

  //encontrar todos os recados
  @Get()
  async findAll(@Query() paginationDto: paginationDto) {
    console.log(
      this.removeSpacesRegex.execute(' R e m o v e / o s / e s p a ç o s '),
    );
    console.log(
      this.onlyLowerCaseLettersRegex.execute('AQUI VEMOS letras minusculas'),
    );
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

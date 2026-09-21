import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable({ scope: Scope.DEFAULT }) // O PROVIDER EM QUESTAO É UM SINGLETON
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoasService,
    private readonly configService: ConfigService, //posso passar a tipagem aqui tbm, n faz nada real facilita o desenvolvimento
  ) {
    // const databaseUserName = this.configService.get('DB_USERNAME');
    // console.log(databaseUserName);
    const databaseUserName = this.configService.get<string>('DB_USERNAME'); //posso inferir o tipo aqui
    console.log(databaseUserName);
  }

  throwNotFoundError() {
    throw new NotFoundException('Recado nao encontrado');
  }

  async findAll(paginationDto: paginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const recados = await this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: {
        de: true,
        para: true,
      },
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          name: true,
        },
        para: {
          id: true,
          name: true,
        },
      },
    });
    return recados;
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: {
        de: true,
        para: true,
      },
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          name: true,
        },
        para: {
          id: true,
          name: true,
        },
      },
    });
    if (recado) return recado;
    this.throwNotFoundError();
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;

    const de = await this.pessoaService.findOne(deId);

    const para = await this.pessoaService.findOne(paraId);

    const novoRecado = {
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(novoRecado);
    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.findOne(id);

    if (!recado) return this.throwNotFoundError();

    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;

    await this.recadoRepository.save(recado);

    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({ id });

    if (!recado) return this.throwNotFoundError();

    return this.recadoRepository.remove(recado);
  }
}

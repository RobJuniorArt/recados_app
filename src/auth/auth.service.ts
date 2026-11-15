import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { Pessoa } from 'src/pessoas/entities/pessoa.entity';

@Injectable()
export class AuthService {
  constructor(private readonly pessoaRepository: Repository<Pessoa>) {}
  
  async login(LoginDto: LoginDto) {
    return LoginDto;
  }
}

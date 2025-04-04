import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CadastrarUsuarioDto } from '../cadastrar-usuario.dto';
import { CadastrarUsuarioService } from '../cadastrar-usuario.service';
import { CadastrarUsuarioController } from './cadastrar-usuario.controller';

describe('CadastrarUsuarioControllerTest', () => {
  let controller: CadastrarUsuarioController;

  const mockCadastrarUsuarioService = {
    criar: jest.fn(),
    buscarPorEmail: jest.fn(),
    hashSenha: jest.fn(),
  };

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CadastrarUsuarioController],
      providers: [
        {
          provide: CadastrarUsuarioService,
          useValue: mockCadastrarUsuarioService,
        },
      ],
    }).compile();

    controller = module.get<CadastrarUsuarioController>(CadastrarUsuarioController);
    
    mockResponse.status.mockClear();
    mockResponse.json.mockClear();
    mockCadastrarUsuarioService.criar.mockClear();
  });

  it('Deve cadastrar um usuário com sucesso.', async () => {
    const dados: CadastrarUsuarioDto = {
      email: 'test@test.com',
      senha: '123456',
      confirmacaoSenha: '123456',
    };

    mockCadastrarUsuarioService.buscarPorEmail.mockResolvedValue(null);
    mockCadastrarUsuarioService.hashSenha.mockResolvedValue('hashed_password');

    await controller.cadastrar(dados, mockResponse as any);

    expect(mockCadastrarUsuarioService.buscarPorEmail).toHaveBeenCalledWith("test@test.com");
    expect(mockResponse.json).not.toHaveBeenCalledWith({ mensagem: 'Email já cadastrado' });
    expect(mockResponse.json).not.toHaveBeenCalledWith({ mensagem: 'As senhas não coincidem' });
    expect(mockResponse.status).not.toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    mockCadastrarUsuarioService.buscarPorEmail.mockResolvedValue(null);
    expect(mockCadastrarUsuarioService.hashSenha).toHaveBeenCalledWith("123456");
    expect(mockCadastrarUsuarioService.criar).toHaveBeenCalledWith('test@test.com', "hashed_password");
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({ mensagem: 'Usuário cadastrado com sucesso.' });
  });

  // Deve falhar caso o email já tenha sido cadastrado
  it('Deve falhar caso o email já tenha sido cadastrado', async () => {
    const dados: CadastrarUsuarioDto = {
      email: 'test@test.com',
      senha: '123456',
      confirmacaoSenha: '123456',
    };

    mockCadastrarUsuarioService.buscarPorEmail.mockResolvedValue(true);

    await controller.cadastrar(dados, mockResponse as any);

    expect(mockCadastrarUsuarioService.buscarPorEmail).toHaveBeenCalledWith("test@test.com");
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({ mensagem: 'Email já cadastrado' });
    expect(mockCadastrarUsuarioService.criar).not.toHaveBeenCalled();
  });

  // Deve falhar caso as senhas não coincidam
  it('Deve falhar caso as senhas não coincidam', async () => {
    const dados: CadastrarUsuarioDto = {
      email: 'test@test.com',
      senha: '123456',
      confirmacaoSenha: '654321',
    };

    mockCadastrarUsuarioService.buscarPorEmail.mockResolvedValue(null);

    await controller.cadastrar(dados, mockResponse as any);

    expect(mockCadastrarUsuarioService.buscarPorEmail).toHaveBeenCalledWith("test@test.com");
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({ mensagem: 'As senhas não coincidem' });
    expect(mockCadastrarUsuarioService.criar).not.toHaveBeenCalled();
  });


});
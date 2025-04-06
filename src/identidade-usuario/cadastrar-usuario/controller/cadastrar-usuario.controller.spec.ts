import { HttpStatus } from '@nestjs/common';
import { CadastrarUsuarioDto } from '../cadastrar-usuario.dto';
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
  };

  const mockUsuarioService = {
    criar: jest.fn(),
    buscarPorEmail: jest.fn(),
  };

  beforeEach(async () => {
    controller = new CadastrarUsuarioController(
      mockCadastrarUsuarioService as any,
      mockUsuarioService as any,
    );

    mockResponse.status.mockClear();
    mockResponse.json.mockClear();
    mockUsuarioService.criar.mockClear();
  });

  it('Deve cadastrar um usuário com sucesso.', async () => {
    const dados: CadastrarUsuarioDto = {
      email: 'test@test.com',
      senha: '123456',
      confirmacaoSenha: '123456',
    };

    mockUsuarioService.buscarPorEmail.mockResolvedValue(null);
    mockCadastrarUsuarioService.hashSenha.mockResolvedValue('hashed_password');

    await controller.cadastrar(dados, mockResponse as any);

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(
      'test@test.com',
    );
    expect(mockResponse.json).not.toHaveBeenCalledWith({
      mensagem: 'Email já cadastrado',
    });
    expect(mockResponse.json).not.toHaveBeenCalledWith({
      mensagem: 'As senhas não coincidem',
    });
    expect(mockResponse.status).not.toHaveBeenCalledWith(
      HttpStatus.BAD_REQUEST,
    );
    mockUsuarioService.buscarPorEmail.mockResolvedValue(null);
    expect(mockCadastrarUsuarioService.hashSenha).toHaveBeenCalledWith(
      '123456',
    );
    expect(mockUsuarioService.criar).toHaveBeenCalledWith(
      'test@test.com',
      'hashed_password',
    );
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      mensagem: 'Usuário cadastrado com sucesso.',
    });
  });

  // Deve falhar caso o email já tenha sido cadastrado
  it('Deve falhar caso o email já tenha sido cadastrado', async () => {
    const dados: CadastrarUsuarioDto = {
      email: 'test@test.com',
      senha: '123456',
      confirmacaoSenha: '123456',
    };

    mockUsuarioService.buscarPorEmail.mockResolvedValue(true);

    await controller.cadastrar(dados, mockResponse as any);

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(
      'test@test.com',
    );
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      mensagem: 'Email já cadastrado',
    });
    expect(mockUsuarioService.criar).not.toHaveBeenCalled();
  });

  // Deve falhar caso as senhas não coincidam
  it('Deve falhar caso as senhas não coincidam', async () => {
    const dados: CadastrarUsuarioDto = {
      email: 'test@test.com',
      senha: '123456',
      confirmacaoSenha: '654321',
    };

    mockUsuarioService.buscarPorEmail.mockResolvedValue(null);

    await controller.cadastrar(dados, mockResponse as any);

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(
      'test@test.com',
    );
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      mensagem: 'As senhas não coincidem',
    });
    expect(mockUsuarioService.criar).not.toHaveBeenCalled();
  });
});

import { AutenticarUsuarioDto } from '../autenticar-usuario.dto';
import { AutenticarUsuarioController } from './autenticar-usuario.controller';

describe('AutenticarUsuarioControllerTest', () => {
  let controller: AutenticarUsuarioController;

  const mockUsuarioService = {
    buscarPorEmail: jest.fn(),
  };

  const mockAutenticarUsuarioService = {
    compararSenhas: jest.fn(),
    gerarJwt: jest.fn(),
  };

  beforeEach(async () => {
    controller = new AutenticarUsuarioController(
      mockAutenticarUsuarioService as any,
      mockUsuarioService as any,
    );

    mockAutenticarUsuarioService.compararSenhas.mockClear();
    mockAutenticarUsuarioService.gerarJwt.mockClear();
    mockUsuarioService.buscarPorEmail.mockClear();
  });

  it('Deve autenticar um usuário com sucesso', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const dados: AutenticarUsuarioDto = {
      email: 'test@example.com',
      senha: 'senha',
    };

    mockUsuarioService.buscarPorEmail.mockResolvedValue({
      email: dados.email,
      senha: 'hash',
    });

    mockAutenticarUsuarioService.compararSenhas.mockResolvedValue(true);
    mockAutenticarUsuarioService.gerarJwt.mockResolvedValue('token');

    await controller.autenticar(dados, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({ accessToken: 'token' });
    expect(mockResponse.json).not.toHaveBeenCalledWith({
      mensagem: 'Senha incorreta.',
    });
    expect(mockResponse.json).not.toHaveBeenCalledWith({
      mensagem: 'Usuário não encontrado',
    });
    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(dados.email);
    expect(mockAutenticarUsuarioService.compararSenhas).toHaveBeenCalledWith(
      dados.senha,
      'hash',
    );
    expect(mockAutenticarUsuarioService.gerarJwt).toHaveBeenCalledWith(
      dados.email,
    );
  });

  it('Deve retornar 404 se o usuário não for encontrado', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const dados: AutenticarUsuarioDto = {
      email: 'nonexistent@example.com',
      senha: 'password',
    };

    mockUsuarioService.buscarPorEmail.mockResolvedValue(null);

    await controller.autenticar(dados, mockResponse);

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(
      'nonexistent@example.com',
    );
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      mensagem: 'Usuário não encontrado',
    });
  });

  it('Deve retornar 400 se a senha estiver incorreta', async () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    const dados: AutenticarUsuarioDto = {
      email: 'test@example.com',
      senha: 'wrongPassword',
    };

    const mockUsuario = { email: dados.email, senha: 'hashedPassword' };

    mockUsuarioService.buscarPorEmail.mockResolvedValue(mockUsuario);
    mockAutenticarUsuarioService.compararSenhas.mockResolvedValue(false);

    await controller.autenticar(dados, mockResponse);

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(dados.email);
    expect(mockAutenticarUsuarioService.compararSenhas).toHaveBeenCalledWith(
      dados.senha,
      mockUsuario.senha,
    );
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      mensagem: 'Senha incorreta.',
    });
  });
});

import { HttpStatus } from '@nestjs/common';
import { UrlIdParam } from '../../url-id.parm';
import { ExcluirUrlController } from './excluir-url.controller';

describe('ExcluirUrlControllerTest', () => {
  let controller: ExcluirUrlController;

  const mockUrlService = {
    buscarPorId: jest.fn(),
    excluir: jest.fn(),
  } as any;

  const mockUsuarioService = {
    buscarPorEmail: jest.fn(),
  } as any;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as any;

  const mockRequest = {
    usuario: {
      email: 'test@example.com',
    },
  };

  const mockUrlIdParam: UrlIdParam = {
    urlId: 1,
  };

  beforeEach(async () => {
    controller = new ExcluirUrlController(mockUrlService, mockUsuarioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve excluir uma URL corretamente', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue({ id: 1 });
    mockUrlService.buscarPorId.mockResolvedValue({ usuario: { id: 1 } });

    await controller.excluir(mockUrlIdParam, mockRequest, mockResponse);

    expect(mockUrlService.excluir).toHaveBeenCalledWith(1);
    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(
      mockRequest.usuario.email,
    );
    expect(mockUrlService.buscarPorId).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
  });

  it('Deve retornar 404 caso o usuário não seja encontrato.', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue(null);

    await controller.excluir(
      mockUrlIdParam,
      { usuario: { email: 'test@example.com' } },
      mockResponse,
    );

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(
      'test@example.com',
    );
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Usuário não encontrado',
    });
    expect(mockUrlService.excluir).not.toHaveBeenCalled();
  });

  it('Deve retornar 404 caso a URL não seja encontrada.', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue({ id: 1 });
    mockUrlService.buscarPorId.mockResolvedValue(null);

    await controller.excluir(
      mockUrlIdParam,
      { usuario: { email: 'test@example.com' } },
      mockResponse,
    );

    expect(mockUrlService.buscarPorId).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Url não encontrada',
    });
    expect(mockUrlService.excluir).not.toHaveBeenCalled();
  });

  it('Deve retornar 403 caso o usuário autenticado não seja dono da URL.', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue({ id: 1 });
    mockUrlService.buscarPorId.mockResolvedValue({ usuario: { id: 2 } });

    await controller.excluir(
      mockUrlIdParam,
      { usuario: { email: 'test@example.com' } },
      mockResponse,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Você não tem permissão para excluir esta Url',
    });
    expect(mockUrlService.excluir).not.toHaveBeenCalled();
  });
});

import { HttpStatus } from '@nestjs/common';
import { UrlIdParam } from '../../url-id.parm';
import { AtualizarUrlController } from './atualizar-url.controller';

describe('AtualizarUrlControllerTest', () => {
  let controller: AtualizarUrlController;

  const mockUrlService = {
    buscarPorId: jest.fn(),
    atualizar: jest.fn(),
  } as any;

  const mockUsuarioService = {
    buscarPorEmail: jest.fn(),
  } as any;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as any;

  const mockUrlIdParam: UrlIdParam = {
    urlId: 1,
  };

  const mockRequest = {
    usuario: {
      email: 'test@example.com',
    },
  };

  const mockAtualizarUrlDto = { origem: 'nova-origem' };

  beforeEach(async () => {
    controller = new AtualizarUrlController(mockUrlService, mockUsuarioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve atualizar uma URL corretamente', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue({ id: 1 });
    mockUrlService.buscarPorId.mockResolvedValue({ usuario: { id: 1 } });

    await controller.atualizar(
      mockUrlIdParam,
      mockAtualizarUrlDto,
      mockRequest,
      mockResponse,
    );

    expect(mockUrlService.atualizar).toHaveBeenCalledWith(
      1,
      mockAtualizarUrlDto.origem,
    );
    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith(
      mockRequest.usuario.email,
    );
    expect(mockUrlService.buscarPorId).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.OK,
      data: { origem: mockAtualizarUrlDto.origem },
      message: 'Url atualizada com sucesso',
    });
  });

  it('Deve retornar 404 caso o usuário não seja encontrato.', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue(null);

    await controller.atualizar(
      mockUrlIdParam,
      mockAtualizarUrlDto,
      mockRequest,
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
    expect(mockUrlService.atualizar).not.toHaveBeenCalled();
  });

  it('Deve retornar 404 caso a URL não seja encontrada.', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue({ id: 1 });
    mockUrlService.buscarPorId.mockResolvedValue(null);

    await controller.atualizar(
      mockUrlIdParam,
      mockAtualizarUrlDto,
      mockRequest,
      mockResponse,
    );

    expect(mockUrlService.buscarPorId).toHaveBeenCalledWith(1);
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Url não encontrada',
    });
    expect(mockUrlService.atualizar).not.toHaveBeenCalled();
  });

  it('Deve retornar 403 caso o usuário autenticado não seja dono da URL.', async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue({ id: 1 });
    mockUrlService.buscarPorId.mockResolvedValue({ usuario: { id: 2 } });

    await controller.atualizar(
      mockUrlIdParam,
      mockAtualizarUrlDto,
      mockRequest,
      mockResponse,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.FORBIDDEN);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.FORBIDDEN,
      message: 'Você não tem permissão para atualizar esta Url',
    });
    expect(mockUrlService.atualizar).not.toHaveBeenCalled();
  });
});

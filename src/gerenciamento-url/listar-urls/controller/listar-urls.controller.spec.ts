import { HttpStatus } from '@nestjs/common';
import { Url } from '../../url.entity';
import { ListarUrlsController } from './listar-urls.controller';

describe('ListarUrlsController', () => {
  let controller: ListarUrlsController;

  let mockUrlService: any = {
    buscarTodos: jest.fn(),
  };
  let mockUsuarioService: any = {
    buscarPorEmail: jest.fn(),
  };
  let mockResposne: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  let mockRequest: any = {
    usuario: { email: "teste@email.com" },
  };

  beforeEach(async () => {
    controller = new ListarUrlsController(mockUrlService, mockUsuarioService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve listar as URLs do usuário autenticado com sucesso.", async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue({ id: 1, email: "teste@email.com" });
    mockUrlService.buscarTodos.mockResolvedValue([new Url()]);
    
    await controller.listar(mockRequest, mockResposne);

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith("teste@email.com");
    expect(mockUrlService.buscarTodos).toHaveBeenCalledWith({ id: 1, email: "teste@email.com" });
    expect(mockResposne.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(mockResposne.json).toHaveBeenCalledWith([new Url()]);
  });

  it("Deve retornar 404 caso o usuário não seja encontrado.", async () => {
    mockUsuarioService.buscarPorEmail.mockResolvedValue(null);
    
    await controller.listar(mockRequest, mockResposne);

    expect(mockUsuarioService.buscarPorEmail).toHaveBeenCalledWith("teste@email.com");
    expect(mockResposne.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResposne.json).toHaveBeenCalledWith({ message: "Usuário não encontrado" });
    expect(mockUrlService.buscarTodos).not.toHaveBeenCalled();
    expect(mockResposne.status).not.toBeCalledWith(HttpStatus.OK);
  });
});

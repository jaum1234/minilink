import { LogAcesso } from '../../log_acesso.entity';
import { RedirecionarParaOrigemController } from './redirecionar-para-origem.controller';

describe('RedirecionarParaOrigemControllerTest', () => {
  let controller: RedirecionarParaOrigemController;

  const mockConfigService: any = {
    get: jest.fn(),
  };

  const mockUrlService: any = {
    buscarPorEncurtada: jest.fn(),
    adicionarAcesso: jest.fn(),
  };

  const mockLogAcessoService: any = {
    criar: jest.fn(),
  };

  const mockResponse: any = {
    redirect: jest.fn().mockReturnThis(),
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    controller = new RedirecionarParaOrigemController(
      mockUrlService,
      mockConfigService,
      mockLogAcessoService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve redirecionar para a URL origem', async () => {
    mockConfigService.get.mockReturnValueOnce('http://domain');
    mockUrlService.buscarPorEncurtada.mockResolvedValueOnce({
      origem: 'http://origem.com',
      id: 1,
    });

    const log = new LogAcesso();

    mockLogAcessoService.criar.mockResolvedValueOnce(log);

    await controller.redirecionar('abc123', mockResponse);

    expect(mockUrlService.buscarPorEncurtada).toHaveBeenCalledWith(
      'http://domain/abc123',
    );
    expect(mockLogAcessoService.criar).toHaveBeenCalledWith({
      origem: 'http://origem.com',
      id: 1,
    });
    expect(mockUrlService.adicionarAcesso).toHaveBeenCalledWith(1, log);
    expect(mockResponse.redirect).toHaveBeenCalledWith(
      301,
      'http://origem.com',
    );
  });

  it('Deve retornar 404 se a URL não for encontrada', async () => {
    mockConfigService.get.mockReturnValueOnce('http://domain');
    mockUrlService.buscarPorEncurtada.mockResolvedValueOnce(null);

    mockResponse.status.mockReturnValue(mockResponse);

    await controller.redirecionar('abc123', mockResponse);

    expect(mockUrlService.buscarPorEncurtada).toHaveBeenCalledWith(
      'http://domain/abc123',
    );
    expect(mockLogAcessoService.criar).not.toHaveBeenCalled();
    expect(mockUrlService.adicionarAcesso).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      mensagem: 'Url não encontrada.',
    });
  });
});

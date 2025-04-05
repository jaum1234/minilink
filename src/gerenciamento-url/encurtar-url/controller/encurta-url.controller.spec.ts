// Escreva um teste que verifique se o controller encurta uma url corretamente

import { EncurtarUrlDto } from '../encurtar-url.dto';
import { EncutarUrlController } from './encurtar-url.controller';

describe('EncutarUrlControllerTest', () => {
  let controller: EncutarUrlController;

  let mockEncutarUrlService: any;
  let mockConfigService: any;
  let mockUrlService: any;

  beforeEach(async () => {
    mockEncutarUrlService = {
      encutar: jest.fn(),
    };

    mockUrlService = {
      criar: jest.fn(),
    }

    mockConfigService = {
      get: jest.fn(),
    };

    controller = new EncutarUrlController(
      mockEncutarUrlService,
      mockUrlService,
      mockConfigService,
    );
  });

  it('Deve encurtar uma URL corretamente', () => {
    const urlOrigem = 'https://www.example.com/pagina-muito-longa-com-varios-parametros';
    const codigoGerado = 'abc123';
    const baseUrl = 'http://localhost:3000';      

    const dados: EncurtarUrlDto = { origem: urlOrigem };

    mockEncutarUrlService.encutar.mockReturnValue(codigoGerado);
    mockConfigService.get.mockReturnValue(baseUrl);

    const resultado = controller.encutar(dados);

    expect(mockEncutarUrlService.encutar).toHaveBeenCalledWith(urlOrigem);
    expect(mockUrlService.criar).toHaveBeenCalledWith(urlOrigem, codigoGerado, [], undefined);
    expect(mockConfigService.get).toHaveBeenCalledWith('BASE_URL');
    expect(resultado.encurtada).toEqual(`${baseUrl}/${codigoGerado}`);
  });
});

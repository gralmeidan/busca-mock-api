import { ApiProperty } from '@nestjs/swagger';
import { Airline } from './create-search.dto';

export class FlightValueDTO {
  @ApiProperty({ examples: [237.4, 18_000], type: Number })
  Adulto: number;

  @ApiProperty({ examples: [237.4, 18_000], type: Number })
  Crianca: number;

  @ApiProperty({ example: 0, type: Number })
  Bebe: number;

  @ApiProperty({ example: false })
  Executivo: boolean;

  @ApiProperty({ example: 50.23, type: Number })
  TaxaEmbarque: number;

  @ApiProperty({
    example: {
      BagagemMao: { '10kg': 1 },
      BagagemDespachada: {
        '23kg': 1,
        '32kg': 1,
      },
    },
  })
  LimiteBagagem: {
    BagagemMao: {
      '10kg': number;
    };
    BagagemDespachada: {
      '23kg'?: number;
      '32kg'?: number;
    };
  };
}

export class FlightPointsDTO extends FlightValueDTO {
  @ApiProperty({ example: 'Econômico' })
  TipoMilhas: string;
}

export class FlightPriceDTO extends FlightValueDTO {
  @ApiProperty({ example: 'Econômico' })
  TipoValor: string;
}

export enum FlightDirection {
  Outbound = 'Ida',
  Inbound = 'Volta',
}

export class FlightConnections {
  @ApiProperty({ example: 'AD 9080' })
  NumeroVoo: string;

  @ApiProperty({ example: '3/12/2022 01:55' })
  EmbarqueCompleto: string;

  @ApiProperty({ example: '3/12/2022 04:50' })
  DesembarqueCompleto: string;

  @ApiProperty({ example: '3/12/2022' })
  DataEmbarque: string;

  @ApiProperty({ example: '3/12/2022' })
  DataDesembarque: string;

  @ApiProperty({ example: '01:55' })
  Embarque: string;

  @ApiProperty({ example: '04:50' })
  Desembarque: string;

  @ApiProperty({ example: 'GRU' })
  Origem: string;

  @ApiProperty({ example: 'ZZT' })
  Destino: string;

  @ApiProperty({ example: '02:55' })
  Duracao: string;
}

export class FlightDTO {
  @ApiProperty({ example: 'AZUL', enum: Airline })
  Companhia: Airline;

  @ApiProperty({ example: FlightDirection.Outbound, enum: FlightDirection })
  Sentido: FlightDirection;

  @ApiProperty({ example: 'GRU' })
  Origem: string;

  @ApiProperty({ example: 'MIA' })
  Destino: string;

  @ApiProperty({ example: '3/12/2022 01:55' })
  Embarque: string;

  @ApiProperty({ example: '3/12/2022 13:10' })
  Desembarque: string;

  @ApiProperty({
    example: '11:15',
    description:
      'Duração total do vôo, inclui o tempo gasto esperando pelas conexões',
  })
  Duracao: string;

  @ApiProperty({ example: 'AD 7051' })
  NumeroVoo: string;

  @ApiProperty({ example: 1 })
  NumeroConexoes: number;

  @ApiProperty({ type: FlightPriceDTO, isArray: true })
  Valor: FlightPriceDTO[];

  @ApiProperty({ type: FlightPointsDTO, isArray: true })
  Milhas: FlightPointsDTO[];

  @ApiProperty({ type: FlightConnections, isArray: true })
  Conexoes: FlightConnections[];
}

export class SearchResponseDTO {
  @ApiProperty({ example: '0b03ed62-c42e-42c0-b43d-fb046ed15f2b' })
  Busca: string;

  @ApiProperty({ example: 1739984655859 })
  Criacao: number;

  @ApiProperty({ example: 1739988301461 })
  ExpiraEm: number;

  @ApiProperty({ type: FlightDTO, isArray: true })
  Voos: FlightDTO[];
}

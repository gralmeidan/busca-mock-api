import { Airline } from './create-search.dto';

export class FlightValueDTO {
  Adulto: number;
  Crianca: number;
  Bebe: number;
  Executivo: boolean;
  TaxaAdulto: number;
  TaxaCrianca: number;
  TaxaBebe: number;
  TaxaEmbarque: number;
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
  TipoMilhas: string;
}

export class FlightPriceDTO extends FlightValueDTO {
  TipoValor: string;
}

export enum FlightDirection {
  Outbound = 'Ida',
  Inbound = 'Volta',
}

export class FlightConnections {
  NumeroVoo: string;
  EmbarqueCompleto: string;
  DesembarqueCompleto: string;
  DataEmbarque: string;
  DataDesembarque: string;
  Embarque: string;
  Desembarque: string;
  Origem: string;
  Destino: string;
  Duracao: string;
}

export class FlightDTO {
  Companhia: Airline;
  Sentido: FlightDirection;
  Origem: string;
  Destino: string;
  Embarque: string;
  Desembarque: string;
  Duracao: string;
  NumeroVoo: string;
  Valor: FlightPriceDTO[];
  Milhas: FlightPointsDTO[];
  Conexoes: FlightConnections[];
  NumeroConexoes: number;
}

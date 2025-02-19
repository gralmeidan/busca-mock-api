export interface Airport {
  Iata: string;
  Nome: string;
  Continente?: string;
  Pais: string;
  PaisCodigo?: string;
  Regiao?: string;
  RegiaoCodigo?: string;
  Local?: string;
  SubLocal?: string;
  FusoHorario?: string;
}

export interface MetropolitanArea extends Airport {
  Aeroportos?: string[];
}

export type AirportDTO = Airport | MetropolitanArea;

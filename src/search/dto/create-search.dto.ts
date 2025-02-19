export enum Airline {
  American = 'AMERICAN AIRLINES',
  Gol = 'GOL',
  Iberia = 'IBERIA',
  Interline = 'INTERLINE',
  Latam = 'LATAM',
  Azul = 'AZUL',
  Tap = 'TAP',
}

export enum FlightType {
  OneWay = 'Ida',
  RoundTrip = 'IdaVolta',
}

export class CreateSearchDTO {
  Companhias: Airline[];
  DataIda: Date;
  DataVolta: Date;
  Origem: string;
  Destino: string;
  Tipo: FlightType;
}

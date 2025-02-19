import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString, Length } from 'class-validator';
import { IsDdMmYYYY } from '@shared/decorators';

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
  @ApiProperty({
    example: Object.values(Airline),
    enum: Airline,
    description: 'Todas as companhias para qual fazer a busca',
  })
  @IsEnum(Airline, { each: true })
  @IsArray()
  Companhias: Airline[];

  @ApiProperty({
    example: '2/12/2025',
    description: 'Não pode ser menor que a data atual ou a data de volta',
  })
  @IsDdMmYYYY()
  DataIda: Date;

  @ApiProperty({
    example: '20/12/2025',
    description: 'Não pode ser menor que a data atual ou a data de ida',
  })
  @IsDdMmYYYY()
  DataVolta: Date;

  @ApiProperty({ example: 'GRU', description: 'Código IATA de 3 caracteres' })
  @IsString()
  @Length(3, 3, { message: 'Código IATA deve ter 3 caracteres' })
  Origem: string;

  @ApiProperty({ example: 'MIA', description: 'Código IATA de 3 caracteres' })
  @IsString()
  @Length(3, 3, { message: 'Código IATA deve ter 3 caracteres' })
  Destino: string;

  @ApiProperty({ example: FlightType.RoundTrip, enum: FlightType })
  @IsEnum(FlightType)
  Tipo: FlightType;
}

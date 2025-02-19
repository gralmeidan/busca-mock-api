import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Airport {
  @ApiProperty({ example: 'BHZ' })
  Iata: string;

  @ApiProperty({ example: 'Belo Horizonte / Todos os Aeroportos' })
  Nome: string;

  @ApiPropertyOptional({ example: 'América do Sul', nullable: true })
  Continente?: string;

  @ApiPropertyOptional({ example: 'Brasil', nullable: true })
  Pais?: string;

  @ApiPropertyOptional({ example: 'BR', nullable: true })
  PaisCodigo?: string;

  @ApiPropertyOptional({ example: 'Minas Gerais', nullable: true })
  Regiao?: string;

  @ApiPropertyOptional({ example: 'MG', nullable: true })
  RegiaoCodigo?: string;

  @ApiPropertyOptional({ example: 'Belo Horizonte', nullable: true })
  Local?: string;

  @ApiPropertyOptional({ example: null, nullable: true })
  SubLocal?: string;

  @ApiPropertyOptional({ example: 'UTC+10:00', nullable: true })
  FusoHorario?: string;
}

export class MetropolitanArea extends Airport {
  @ApiPropertyOptional({
    example: ['CNF', 'PLU'],
    nullable: true,
    description: 'Lista de aeroportos que compõem a região metropolitana',
  })
  Aeroportos?: string[];
}

export type AirportDTO = Airport | MetropolitanArea;

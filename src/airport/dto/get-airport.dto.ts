import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetAirportQueryDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'BHZ' })
  q?: string;
}

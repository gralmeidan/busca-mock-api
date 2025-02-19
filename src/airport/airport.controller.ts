import { Controller, Get } from '@nestjs/common';
import { Airport, AirportDTO, MetropolitanArea } from './dto';
import { AirportService } from './airport.service';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('aeroportos')
@ApiExtraModels(Airport, MetropolitanArea)
export class AirportController {
  constructor(protected readonly airportService: AirportService) {}

  @Get()
  @ApiOkResponse({
    description: 'Lista de aeroportos',
    schema: {
      oneOf: [
        {
          type: 'array',
          items: {
            $ref: getSchemaPath(Airport),
          },
        },
        {
          type: 'array',
          items: {
            $ref: getSchemaPath(MetropolitanArea),
          },
        },
      ],
    },
  })
  async getAirports(): Promise<AirportDTO[]> {
    return this.airportService.getAirports();
  }
}

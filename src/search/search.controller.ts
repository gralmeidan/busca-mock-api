import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SearchService } from './search.service';
import {
  CreateSearchDTO,
  CreateSearchResponseDTO,
  SearchResponseDTO,
} from './dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('busca')
export class SearchController {
  constructor(protected readonly searchService: SearchService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Busca criada com sucesso',
    type: CreateSearchResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Erro nos parâmetros da busca',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Datas inválidas',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno',
  })
  @Post('criar')
  async createSearch(
    @Body() params: CreateSearchDTO
  ): Promise<CreateSearchResponseDTO> {
    if (params.DataIda >= params.DataVolta) {
      throw new UnprocessableEntityException(
        'Data de ida deve ser anterior a data de volta'
      );
    }

    if (new Date() > params.DataIda || new Date() > params.DataVolta) {
      throw new UnprocessableEntityException(
        'Datas não podem ser menores que a data atual'
      );
    }

    return await this.searchService.createFlights(params);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Busca encontrada',
    type: SearchResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Busca não encontrada',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno',
  })
  @Get('/:id')
  async getSearch(@Param('id') searchId: string) {
    return await this.searchService.getFlights(searchId);
  }
}

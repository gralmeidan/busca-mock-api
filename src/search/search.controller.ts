import { Body, Controller, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDTO } from './dto';

@Controller('busca')
export class SearchController {
  constructor(protected readonly searchService: SearchService) {}

  @Post('criar')
  async createSearch(@Body() params: CreateSearchDTO) {
    params.DataIda = new Date(params.DataIda);
    params.DataVolta = new Date(params.DataVolta);

    return this.searchService.getFlights(params);
  }

  @Post('/:searchId/')
  async getSearch() {}
}

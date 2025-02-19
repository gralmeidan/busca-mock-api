import { Injectable } from '@nestjs/common';
import { SearchMock } from './search.mock';
import { CreateSearchDTO } from './dto';

@Injectable()
export class SearchService {
  constructor(protected readonly searchMock: SearchMock) {}

  public async getFlights(params: CreateSearchDTO) {
    return this.searchMock.getMock(params).flat();
  }
}

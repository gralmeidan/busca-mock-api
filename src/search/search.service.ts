import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SearchMock } from './search.mock';
import {
  CreateSearchDTO,
  CreateSearchResponseDTO,
  FlightDTO,
  SearchResponseDTO,
} from './dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { randomUUID } from 'crypto';
import { Cache } from 'cache-manager';

@Injectable()
export class SearchService {
  constructor(
    protected readonly searchMock: SearchMock,
    @Inject(CACHE_MANAGER)
    protected readonly cache: Cache
  ) {}

  private _getCacheKey(searchId: string) {
    return `search:${searchId}`;
  }

  private _getSearchId(): string {
    return randomUUID();
  }

  public async createFlights(
    params: CreateSearchDTO
  ): Promise<CreateSearchResponseDTO> {
    const flights = this.searchMock.getMock(params).flat();
    const id = this._getSearchId();

    const ttl = 60 * 60 * 1000;

    await this.cache.set<SearchResponseDTO>(
      this._getCacheKey(id),
      {
        Busca: id,
        Voos: flights,
        Criacao: Date.now(),
        ExpiraEm: Date.now() + ttl / 2,
      },
      ttl
    );

    return { Busca: id };
  }

  public async getFlights(searchId: string): Promise<SearchResponseDTO> {
    const flights = await this.cache.get<SearchResponseDTO>(
      this._getCacheKey(searchId)
    );

    if (!flights) {
      throw new NotFoundException('Busca não encontrada');
    }

    return flights;
  }
}

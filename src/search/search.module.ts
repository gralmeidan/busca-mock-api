import { Module } from '@nestjs/common';
import { AirportModule } from 'src/airport';
import { SearchService } from './search.service';
import { SearchMock } from './search.mock';
import { SearchController } from './search.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [AirportModule, CacheModule.register()],
  providers: [SearchService, SearchMock],
  controllers: [SearchController],
})
export class SearchModule {}

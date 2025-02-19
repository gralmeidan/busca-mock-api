import { Module } from '@nestjs/common';
import { AirportModule } from 'src/airport';
import { SearchService } from './search.service';
import { SearchMock } from './search.mock';
import { SearchController } from './search.controller';

@Module({
  imports: [AirportModule],
  providers: [SearchService, SearchMock],
  controllers: [SearchController],
})
export class SearchModule {}

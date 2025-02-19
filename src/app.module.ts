import { Module } from '@nestjs/common';
import { AirportModule } from './airport';
import { SearchModule } from './search';

@Module({
  imports: [AirportModule, SearchModule],
})
export class AppModule {}

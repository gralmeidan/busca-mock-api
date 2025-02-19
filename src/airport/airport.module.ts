import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';

@Module({
  imports: [],
  providers: [AirportService],
  exports: [AirportService],
})
export class AirportModule {}

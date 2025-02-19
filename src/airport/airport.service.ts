import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { AirportDTO } from './dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class AirportService implements OnModuleInit {
  protected logger = new Logger(AirportService.name);
  private _airports: AirportDTO[] = [];
  private _airportsMap: Map<string, AirportDTO> = new Map();

  public async onModuleInit() {
    const content = await fs.readFile(
      path.join(__dirname, '..', '..', 'assets', 'airports.json'),
      { encoding: 'utf-8' }
    );

    const data = JSON.parse(content);

    this._airports = data;

    for (const airport of this._airports) {
      this._airportsMap.set(airport.Iata, airport);
    }
  }

  public getAirportData(code: string): AirportDTO {
    const airport = this._airportsMap.get(code);

    if (!airport) {
      throw new NotFoundException(`Airport with code "${code}" not found`);
    }

    return airport;
  }

  /**
   * Para fins de mock, retorna todos os aeroportos que podem ser
   * conexões para um determinado aeroporto.
   *
   * @param code Código IATA de 3 caracteres.
   */
  public getPossibleConnectingAirports(code: string): AirportDTO[] {
    const airport = this.getAirportData(code);
    const result: AirportDTO[] = [];

    for (const data of this._airports) {
      if (data.Iata === code) {
        continue;
      }

      if (
        airport.Pais === data.Pais ||
        airport.PaisCodigo === data.PaisCodigo
      ) {
        result.push(data);
      }
    }

    return result;
  }
}

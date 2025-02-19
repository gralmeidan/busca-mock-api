import { Injectable } from '@nestjs/common';
import {
  Airline,
  CreateSearchDTO,
  FlightDTO,
  FlightDirection,
  FlightConnections,
  FlightType,
} from './dto';
import { AirportService, AirportUtils } from 'src/airport';
import {
  AirlineUtils,
  GetTimeProps,
  NumUtils,
  ObjectUtils,
  TimeUtils,
} from './utils';

@Injectable()
export class SearchMock {
  constructor(protected readonly airportService: AirportService) {}

  private _generateFlightTimes(
    base: Date,
    options: {
      duration?: GetTimeProps;
      waitTime?: GetTimeProps;
      useBase?: boolean;
    } = {}
  ) {
    let departure: Date;

    if (options.useBase) {
      departure = base;
    } else {
      const rawDepartureTime = TimeUtils.getTime(options.waitTime);
      departure = TimeUtils.addToDate(base, rawDepartureTime.num);
    }

    const duration = TimeUtils.getTime(options.duration);
    const arrival = TimeUtils.addToDate(departure, duration.num);

    return {
      departure,
      arrival,
      duration,
    };
  }

  private _generateFlightPrices(type: 'points' | 'cash') {
    const len = NumUtils.randomInt(1, 3);
    const names = ['Start', 'Econômica', 'Executiva'];

    return Array.from({ length: len }).map((_, i) => {
      const { tax, adult, child } =
        type === 'points' ? NumUtils.generatePoints() : NumUtils.generateCash();

      return {
        Adulto: adult,
        Bebe: child,
        Crianca: 0,
        Executivo: false,
        LimiteBagagem: NumUtils.generateLuggage(),
        TaxaAdulto: 0,
        TaxaBebe: 0,
        TaxaCrianca: 0,
        TaxaEmbarque: tax,
        TipoValor: names[i],
        TipoMilhas: names[i],
      };
    });
  }

  private _generateConnections(data: {
    departure: Date;
    from: string;
    to: string;
    cia: Airline;
  }): {
    duration: number;
    departure: Date;
    arrival: Date;
    connections: FlightConnections[];
  } {
    const len = NumUtils.randomInt(1, 4);
    const connections: FlightConnections[] = [];
    const possibleAirports = this.airportService.getPossibleConnectingAirports(
      data.from
    );
    const maxDurationHours = [8, 4, 3, 2][len - 1];
    const maxWaitTimeHours = [0, 20, 6, 2][len - 1];

    const { departure } = this._generateFlightTimes(data.departure);

    let lastOption: {
      to: string;
      arrival: Date;
    } = {
      to: data.from,
      arrival: departure,
    };

    let totalDuration = 0;

    for (let i = 0; i < len; i++) {
      let to: string;

      if (i === len - 1) {
        to = data.to;
      } else {
        to = ObjectUtils.random(possibleAirports).Iata;
      }

      const times = this._generateFlightTimes(lastOption.arrival, {
        duration: { maxHours: maxDurationHours },
        waitTime: { maxHours: maxWaitTimeHours },
        useBase: i === 0,
      });

      const waitTime = times.departure.getTime() - lastOption.arrival.getTime();
      totalDuration += Math.floor(waitTime / 60000);

      const departureTime = TimeUtils.dateToLabel(times.departure);
      const arrivalTime = TimeUtils.dateToLabel(times.arrival);

      connections.push({
        Origem: lastOption.to,
        Destino: to,
        NumeroVoo: AirlineUtils.getFlightNumber(data.cia),
        Duracao: times.duration.label,
        DataDesembarque: arrivalTime.date,
        Desembarque: arrivalTime.time,
        DesembarqueCompleto: arrivalTime.full,
        DataEmbarque: departureTime.date,
        Embarque: departureTime.time,
        EmbarqueCompleto: departureTime.full,
      });

      lastOption = {
        to,
        arrival: times.arrival,
      };

      totalDuration += times.duration.num;
    }

    return {
      duration: totalDuration,
      departure: departure,
      arrival: lastOption.arrival,
      connections,
    };
  }

  private _generateFlight(
    params: CreateSearchDTO,
    data: {
      cia: Airline;
      direction: FlightDirection;
    }
  ): FlightDTO {
    const from = AirportUtils.getSubAirport(params.Origem);
    const to = AirportUtils.getSubAirport(params.Destino);

    const { departure, arrival, connections, duration } =
      this._generateConnections({
        departure:
          data.direction === FlightDirection.Outbound
            ? params.DataIda
            : params.DataVolta,
        from: from,
        to: to,
        cia: data.cia,
      });

    return {
      Companhia: data.cia,
      Sentido: data.direction,
      Origem: from,
      Destino: to,
      Embarque: TimeUtils.dateToLabel(departure).full,
      Desembarque: TimeUtils.dateToLabel(arrival).full,
      Conexoes: connections,
      NumeroConexoes: connections.length - 1,
      Duracao: TimeUtils.minToLabel(duration),
      NumeroVoo: AirlineUtils.getFlightNumber(data.cia),
      Valor: this._generateFlightPrices('cash'),
      Milhas: this._generateFlightPrices('points'),
    };
  }

  private _getFlightsForCia(params: CreateSearchDTO, cia: Airline) {
    const flights: FlightDTO[] = [];

    const outboundLen = NumUtils.randomInt(3, 15);
    const inboundLen = NumUtils.randomInt(3, 15);

    for (let i = 0; i < outboundLen; i++) {
      flights.push(
        this._generateFlight(params, {
          cia,
          direction: FlightDirection.Outbound,
        })
      );
    }

    if (params.DataVolta && params.Tipo === FlightType.RoundTrip) {
      for (let i = 0; i < inboundLen; i++) {
        flights.push(
          this._generateFlight(params, {
            cia,
            direction: FlightDirection.Inbound,
          })
        );
      }
    }

    return flights;
  }

  public getMock(params: CreateSearchDTO) {
    return params.Companhias.map(cia => this._getFlightsForCia(params, cia));
  }
}

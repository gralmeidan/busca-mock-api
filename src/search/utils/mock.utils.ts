import { Airline, FlightValueDTO } from '../dto';

export namespace NumUtils {
  export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  export function generateCash(min: number = 400, max: number = 10000) {
    const base = randomFloat(min, max);
    const tax = base * 0.1;

    return {
      price: base,
      tax,
      adult: base - tax,
      child: Math.random() > 0.5 ? base * 0.7 - tax : base - tax,
    };
  }

  export function generatePoints(min: number = 1000, max: number = 90000) {
    const base = randomInt(min / 100, max / 100) * 100;
    const tax = generateCash().tax;

    return {
      price: base,
      tax,
      adult: base,
      child: base,
    };
  }

  export function generateLuggage(): FlightValueDTO['LimiteBagagem'] {
    return {
      BagagemDespachada: {
        '23kg': randomInt(0, 2),
      },
      BagagemMao: {
        '10kg': 1,
      },
    };
  }
}

export namespace ObjectUtils {
  export function random<T>(arr: T[]): T {
    return arr[NumUtils.randomInt(0, arr.length - 1)];
  }
}

export interface GetTimeProps {
  maxHours?: number;
  maxMinutes?: number;
}

export namespace TimeUtils {
  export function getTime({
    maxHours = 24,
    maxMinutes = 60,
  }: GetTimeProps = {}) {
    const hours = NumUtils.randomInt(1, maxHours);
    const minutesA = NumUtils.randomInt(0, maxMinutes / 10);
    const minutesB = Math.random() > 0.5 ? 0 : 5;
    const num = hours * 60 + minutesA * 10 + minutesB;

    return {
      label: minToLabel(num),
      num,
    };
  }

  export function labelToNum(time: string): number {
    const [hours, minutes] = time.split(':').map(v => parseInt(v, 10));
    return hours * 60 + minutes;
  }

  export function minToLabel(num: number): string {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  }

  export function msToLabel(num: number): string {
    const minutes = Math.floor(num / 60000);

    return minToLabel(minutes);
  }

  export function dateToLabel(date: Date): {
    date: string;
    time: string;
    full: string;
  } {
    const dateLabel = [
      date.getUTCDate(),
      (date.getUTCMonth() + 1).toString().padStart(2, '0'),
      date.getUTCFullYear(),
    ].join('/');

    const timeLabel = [date.getUTCHours(), date.getUTCMinutes()]
      .map(e => e.toString().padStart(2, '0'))
      .join(':');

    return {
      date: dateLabel,
      time: timeLabel,
      full: `${dateLabel} ${timeLabel}`,
    };
  }

  export function addToDate(date: Date, minutes: number): Date {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return newDate;
  }
}

export namespace AirlineUtils {
  export function getFlightNumberPrefix(cia: Airline) {
    switch (cia) {
      case Airline.Gol:
        return `G${NumUtils.randomInt(1, 5)}`;
      case Airline.Latam:
        return 'LA';
      case Airline.Azul:
        return 'AD';
      case Airline.Tap:
        return 'TP';
      case Airline.American:
        return 'AA';
      case Airline.Iberia:
        return 'IB';
      case Airline.Interline:
        return 'IL';
    }
  }

  export function getFlightNumber(cia: Airline) {
    return `${getFlightNumberPrefix(cia)} ${NumUtils.randomInt(1000, 9999)}`;
  }
}

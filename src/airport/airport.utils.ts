export namespace AirportUtils {
  /**
   * Alguns códigos iata correspondem a Zonas Metropolitanas.
   *
   * Isso significa que ele não representa um aeroporto específico, mas sim
   * uma região e todos os aeroportos que a compõem.
   *
   * Essa função recebe uma `iata` e ou retorna a própria `iata` ou uma das
   * iatas que compõem a zona metropolitana.
   *
   * @param iata
   */
  export function getSubAirport(iata: string) {
    const airports = {
      SAO: ['GRU', 'CGH', 'VCP'],
      RIO: ['GIG', 'SDU'],
      BHZ: ['CNF', 'PLU'],
    } as Record<string, string[]>;

    const arr = airports[iata] ?? [iata];

    return arr[Math.floor(Math.random() * arr.length)];
  }
}

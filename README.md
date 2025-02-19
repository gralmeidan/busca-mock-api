# POST /busca/criar

Body:
{
cias: ["AZUL"],
ida: "2020-10-26",
volta: "2020-11-05",
origem: "SAO",
destino: "RIO",
tipo: "Ida" | "IdaVolta",
/// O cara também deve colocar passageiros
/// Porém a gente não aceita esse parâmetro.
}

# GET /busca/:id

Só responde todos os Vôos que batem com a pesquisa, Limita 10 por companhia.

# GET /aeroportos

Responde todos os aeroportos que a gente tem data.

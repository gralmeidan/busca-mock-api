# API de Mock Buscamilhas.

Esse projeto retorna dados mockados de vôos de linhas aéreas.

## Instalação

- Clone o repositório.

<details>
  <summary>Node</summary>

- Verifique se você está na versão v20.16.0

```bash
$ node --version
v20.16.0
```

- Instale os pacotes com npm

```bash
npm install
```

- Inicie a api.

```bash
npm run start:dev
```

</details>

<details>
  <summary>Bun</summary>

- Verifique se o node está na versão correta.

```bash
$ node --version
v20.16.0
```

- Siga as [intruções](https://bun.sh/) para seu sistema operacional para instalar o bun.
- Instale os pacotes

```bash
bun install
```

- Inicie a api.

```bash
$ bun start:dev
```

</details>

## Utilização

Acesse http://localhost:3000/docs para acessar a documentação em swagger.

## Env

| Variável | Descrição                    | Valor Padrão |
| -------- | ---------------------------- | ------------ |
| `PORT`   | Porta em que a API irá rodar | `3000`       |

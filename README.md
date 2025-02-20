# API de Mock Buscamilhas.

Esse projeto retorna dados mockados de vôos de linhas aéreas.

## Instalação

- Clone o repositório.

<details>
  <summary>Node</summary>

- Caso não tenha o Node instalado, installe o [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)

- Com o nvm instalado, instale a versão v20.16.0 do Node

```bash
nvm install 20.16.0
```

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

Para acessar a collection de requisições, utilize a ferramenta [Bruno](https://www.usebruno.com/). A coleção está salva em `bruno/bruno.json`.

## Env

| Variável | Descrição                    | Valor Padrão |
| -------- | ---------------------------- | ------------ |
| `PORT`   | Porta em que a API irá rodar | `3000`       |

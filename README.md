# Desafio Back-end Mestres da WEB

Antes de mais nada, gostaríamos de agradecer pelo interesse em integrar nossa equipe! Abaixo estão as instruções para que você dê início ao teste.

## Descrição

Com o atual cenário da pandemia, as empresas de todos os seguimentos tiveram que acelerar seu processo tecnológico, afim de continuar entregando valor para seu consumidor.

Sendo assim, crie um sistema capaz de gerenciar o estoque de uma loja virtual de roupas, em que apenas o administrador da plataforma seja capaz de criar, listar, editar e deletar produtos.

Todos os produtos devem apresentar a opção de cadastros de SKUs, ou seja, de variações do mesmo produto, indicando a quantidade correspondente a cada SKU. Ex: Camiseta com tamanhos P, M, G; Tênis com tamanhos 39, 40, 41, 42.

## Começando

Para executar o projeto, será necessário:

- [Docker: para criar o banco de dados PostgreSQL da aplicação](https://www.docker.com/)
- [Yarn: para usar como gerenciador de pacotes pro projeto](https://yarnpkg.com/lang/en/docs/install/)
- [Node.js: para executar os nossos códigos](https://nodejs.org/en/download/)

## Instalando

Para iniciar a instalação é necessário clonar o projeto do GitHub num diretório de sua preferência:

```shell
cd "diretorio de sua preferencia"
git clone https://github.com/vinisco/mestres-da-web-repository
```

Depois utilizar o yarn install dentro do diretório para instalar as dependencias:

```shell
yarn install
```

Logo após, criar um container no Docker com a imagem do PostgreSQL:

```shell
docker run --name desafio_mestres_da_web -e  POSTGRES_PASSWORD=desafio -p 5433:5432 -d postgres
```

## Executando

Dentro do dirétorio do projeto, rodar as migrations do bando de dados:

```shell
yarn typeorm migration:run
```

Executar a aplicação no modo desenvolvedor:

```shell
yarn dev:server
```

## Testar os endPoints e consumir a API

- [Documentação: para os devidos testes e a utilização da Api](https://documenter.getpostman.com/view/11502620/TVmTaZeE/)

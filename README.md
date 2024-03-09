# iRango API
![typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
![Node 20.10](https://shields.io/badge/Node-20.10.0-339933?logo=Node.js&logoColor=FFF&style=flat-square)
![nestjs](https://shields.io/badge/NestJS-E0234E?logo=NestJS&logoColor=FFF&style=flat-square)
![mysql](https://shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=FFF&style=flat-square)
![redis](https://shields.io/badge/Redis-DC382D?logo=Redis&logoColor=FFF&style=flat-square)
![docker](https://shields.io/badge/Docker-2496ED?logo=Docker&logoColor=FFF&style=flat-square)
![kubernetes](https://shields.io/badge/Kubernetes-326CE5?logo=Kubernetes&logoColor=FFF&style=flat-square)
![swagger](https://shields.io/badge/Swagger-85EA2D?logo=Swagger&logoColor=FFF&style=flat-square)
![make](https://shields.io/badge/Make-00CC00?logo=Make&logoColor=FFF&style=flat-square)
![jest](https://shields.io/badge/Jest-C21325?logo=Jest&logoColor=FFF&style=flat-square)
![eslint](https://shields.io/badge/ESLint-4B32C3?logo=ESLint&logoColor=FFF&style=flat-square)
![editorconfig](https://shields.io/badge/EditorConfig-000000?logo=EditorConfig&logoColor=FFF&style=flat-square)
![typeorm](https://shields.io/badge/TypeORM-F37626?logo=TypeORM&logoColor=FFF&style=flat-square)

This project involves the development of an API for a fast food self-service system, proposed as a Tech Challenge for the Software Architecture Postgraduate Course at FIAP.

For this project, we utilized the [TypeScript](https://www.typescriptlang.org/) programming language with [Node.js](https://nodejs.org/) and the [Nest.js](https://nestjs.com/) framework. The database management includes [MySQL 5.7](https://www.mysql.com/) to handle information related to Consumidor, Produto, and Pedido. Additionally, an in-memory [Redis](https://redis.io/) database is employed for caching.

To build the API documentation, we've used [Swagger](https://swagger.io/) tool integrated with Nest.js, accessible through the endpoint: http://localhost:3000/docs

## [DDD - Domain Driven Design Diagrams](./docs/domain-driven-design.md)

## Application Architecture and Technologies:
![Architecture diagram](./docs/application-diagram.png)

## Workspace Dependencies
- [Node 20.10](https://nodejs.org/)
- [Docker](https://www.docker.com/get-started/)
- Make
  - [Windows](https://gnuwin32.sourceforge.net/packages/make.htm)
  - Linux
  ```bash
  sudo apt update
  sudo apt install make
  ```

## Project Dependencies
Install project dependencies with:
```bash
npm run install
```

## Start Project using Kubernetes
We have a folder ([deploy](./deploy/)) with all necessary files to deploy the application in a kubernetes cluster. We have a `Makefile` to help us to deploy the application in a kubernetes cluster. We need to have a kubernetes cluster running and `kubectl` installed in our machine.
```bash
make k8s.up

# or try without make

kubectl apply -f ./deploy/configmap.yml
```

### Stopping Kubernetes project
```bash
make k8s.down

# or try without make

kubectl delete -f ./deploy
```

## Start Project using Docker
Configure all docker containers and volumes and start the application
```bash
make setup

# or try without make

docker network create -d bridge local-network
cp .env.example .env
docker-compose build --progress=plain
docker-compose up
docker-compose exec -it service-irango-api npm run migration:run
docker-compose exec -it service-irango-api npm run seed:run
```

## Start project without Docker
Watch mode:
```bash
npm run start:dev
```

Compiled mode:
```bash
npm run build
npm run start
```

Migrations and Seeds:
```bash
npm run migration:run
npm run seed:run
```

## How to Use
We developed a seed to populate database with some products and one Consumidor with CPF `123.456.789-00`. You can use it or create a new Consumidor.

## Endpoints
We developed few endpoints which can be found in [consumidores.controller.ts](./src/adapter/driver/nestjs/consumidores/consumidores.controller.ts), [produtos.controller.ts](./src/adapter/driver/nestjs/produtos/produtos.controller.ts) and [pedidos.controller.ts](./src/adapter/driver/nestjs/pedidos/pedidos.controller.ts) files

## Business Requirements:
1. Cadastro do Cliente
> POST http://localhost:3000/consumidores
2. Identificação do Cliente via CPF
> GET http://localhost:3000/consumidores/cpf
3. Criar, editar e remover de produto
> POST http://localhost:3000/produtos

> PUT http://localhost:3000/produtos/:id

> DELETE http://localhost:3000/produtos/:id
4. Buscar produtos por categoria
> GET http://localhost:3000/produtos/categorias/:termo
5. Fake checkout, apenas enviar os produtos escolhidos para a fila
> POST http://localhost:3000/pedidos
6. Listar os pedidos
> GET http://localhost:3000/pedidos

## Automated Tests
We developed integration tests which can be run using docker or in directly in local machine (in this case you need change the `DB_HOSTNAME` env to `localhost`). Before run the tests, we need to create the test database using:
```bash
make test.integration.createdb

# or try without make
docker exec -it ${CONTAINER_MYSQL} mysql -uroot -ppassword -e "DROP DATABASE IF EXISTS ${DATABASE}_test; CREATE DATABASE ${DATABASE}_test;"
docker-compose exec -it ${CONTAINER_BACKEND} npm run migration:run:test
```

### Run all tests (We just have integrations for while)
```bash
# With docker
docker-compose run service-irango-api npm run test

# local
npm run test
```

### Run only integration tests
```bash
# With docker
docker-compose run service-irango-api npm run test:integration

# local
npm run test:integration
```

### Run a specifc test file
```bash
# With docker
docker-compose run service-irango-api npm run test:integration:one <FILE_NAME>

# local
npm run test:integration:one <FILE_NAME>
```

## Make commands
### Using Docker
- Setup Project: `make setup`. This command will create docker network, containers and volumes. It will also start the project and show its logs.
- Start Project: `make up`
- Stop Projects: `make down`
- Show logs: `make logs`
- Add Migration: `make migration.generate name=MigrationName`
- Run Migrations: `make migration.run`
- Add Seed: `make seed.generate name=SeedName`
- Run Seeds: `make seed.run`
- Access container bash: `make bash`
- Access Redis container: `make redis`

### Using Kubernetes
- k8s.up: `create all resources in kubernetes in the correct order (namespace, secrets, configmap, mysql, redis and api)`
- k8s.down: `delete all resources in kubernetes`
- k8s.create.namespace: `create a namespace in kubernetes`
- k8s.create.secrets: `create secrets in kubernetes`
- k8s.create.confimap: `create configmap in kubernetes`
- k8s.create.api: `create irango-api resources in kubernetes`
- k8s.update.api.image: `update irango-api image in kubernetes`
- k8s.create.mysql: `create mysql resources in kubernetes`
- k8s.create.redis: `create redis resources in kubernetes`

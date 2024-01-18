# iRango API

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

## Start Project using Docker
Configure all docker containers and volumes and start the application
```bash
make setup
```
or try without make
```bash
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

## Make commands
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
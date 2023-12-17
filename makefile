#!/bin/bash

NETWORK_NAME=local-network
NETWORK_ID=$(shell docker network ls -qf "name=${NETWORK_NAME}")

CONTAINER_MYSQL = local-mysql
CONTAINER_REDIS = local-redis
CONTAINER_BACKEND = service-irango-api

DATABASE = irango

.PHONY: setup
setup: down add-network create.env.file build up logs

create.env.file:
	if [ ! -f .env ]; then \
		cp .env.example .env; \
	fi

.PHONY: add-network
add-network:
	@if [ -n '${NETWORK_ID}' ]; then \
		echo 'The ${NETWORK_NAME} network already exists. Skipping...'; \
	else \
		docker network create -d bridge ${NETWORK_NAME}; \
	fi

.PHONY: build
build:
	docker-compose build --progress=plain
.PHONY: up
up:
	docker-compose up --remove-orphans -d
.PHONY: down
down:
	docker-compose down
.PHONY: logs
logs:
	docker-compose logs -f
restart: down up

.PHONY:
clean:
	rm -rf dist/
	rm -rf node_modules/
	rm -rf coverage/

migration.recreatedb:
	docker exec -it ${CONTAINER_MYSQL} mysql -uroot -ppassword -e "DROP DATABASE IF EXISTS ${DATABASE}; CREATE DATABASE ${DATABASE};"
	make migration.run
	make seed.run
	make seedDev.run

migration.generate:
	DB_HOSTNAME=localhost npm run migration:generate ./src/database/migrations/$(name)
migration.run:
	DB_HOSTNAME=localhost npm run migration:run
migration.revert:
	DB_HOSTNAME=localhost npm run migration:revert

seed.generate:
	DB_HOSTNAME=localhost npm run seed:generate ./src/database/seeds/$(name)
seed.run:
	DB_HOSTNAME=localhost npm run seed:run
seed.revert:
	DB_HOSTNAME=localhost npm run seed:revert

test: test.unit test.integration
	npm run test:unit
test.unit:
	npm run test:unit
test.integration: test.integration.createdb
	npm run test:integration
test.integration.createdb:
	docker exec -it ${CONTAINER_MYSQL} mysql -uroot -ppassword -e "DROP DATABASE IF EXISTS ${DATABASE}_test; CREATE DATABASE ${DATABASE}_test;"
	npm run migration:run:test

bash:
	docker exec -it ${CONTAINER_BACKEND} /bin/bash
redis:
	docker exec -it ${CONTAINER_REDIS} redis-cli
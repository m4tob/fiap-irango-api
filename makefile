#!/bin/bash

NETWORK_NAME=local-network
NETWORK_ID=$(shell docker network ls -qf "name=${NETWORK_NAME}")

CONTAINER_MYSQL = local-mysql
CONTAINER_REDIS = local-redis
CONTAINER_BACKEND = service-irango-api

DATABASE = irango

IMAGE ?= matob/irango-api

.PHONY: setup
setup: clean down add-network create.env.file build up migration.run seed.run logs

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
	rm -rf coverage/

migration.recreatedb:
	docker exec -it ${CONTAINER_MYSQL} mysql -uroot -ppassword -e "DROP DATABASE IF EXISTS ${DATABASE}; CREATE DATABASE ${DATABASE};"
	make migration.run
	make seed.run

# make migration.generate name=create_table_pedido
migration.generate:
	docker-compose exec -it ${CONTAINER_BACKEND} npm run migration:generate src/infra/persistence/typeorm/migrations/$(name)
migration.run:
	docker-compose exec -it ${CONTAINER_BACKEND} npm run migration:run
migration.revert:
	docker-compose exec -it ${CONTAINER_BACKEND} npm run migration:revert

seed.generate:
	docker-compose exec -it ${CONTAINER_BACKEND} npm run seed:generate src/infra/persistence/typeorm/seeds/$(name)
seed.run:
	docker-compose exec -it ${CONTAINER_BACKEND} npm run seed:run
seed.revert:
	docker-compose exec -it ${CONTAINER_BACKEND} npm run seed:revert

test: test.integration
test.integration: test.integration.createdb
	docker-compose exec -it ${CONTAINER_BACKEND} npm run test:integration
test.integration.createdb:
	docker exec -it ${CONTAINER_MYSQL} mysql -uroot -ppassword -e "DROP DATABASE IF EXISTS ${DATABASE}_test; CREATE DATABASE ${DATABASE}_test;"
	docker-compose exec -it ${CONTAINER_BACKEND} npm run migration:run:test

bash:
	docker exec -it ${CONTAINER_BACKEND} /bin/bash
redis:
	docker exec -it ${CONTAINER_REDIS} redis-cli

k8s.down:
	kubectl delete -f ./deploy

k8s.create.namespace:
	kubectl apply -f ./deploy/namespace.yml

k8s.create.secrets:
	kubectl apply -f ./deploy/secret.yml

k8s.create.confimap:
	kubectl apply -f ./deploy/configmap.yml

k8s.create.api:
	kubectl apply -f ./deploy/deployment.yml
	kubectl apply -f ./deploy/service.yml
	kubectl apply -f ./deploy/hpa.yml

k8s.update.api.image:
	kubectl set image deployment/irango-api=$(IMAGE)

k8s.create.job.migrate:
	kubectl apply -f ./deploy/migrate.yml

k8s.create.mysql:
	kubectl apply -f ./deploy/mysql.yml

k8s.create.redis:
	kubectl apply -f ./deploy/redis.yml

k8s.up:  k8s.create.namespace k8s.create.secrets k8s.create.confimap k8s.create.mysql k8s.create.job.migrate k8s.create.redis k8s.create.api

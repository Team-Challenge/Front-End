include .env

UNAME_M := $(shell uname -m)

## Local installation commands
install:
	npm install

start:
	npm start

lint:
	npm run lint

build:
	npm run build

## Docker commmands
up:

ifeq ($(UNAME_M),x86_64)
	docker-compose -f docker/docker-compose.yaml up --build
else ifeq ($(UNAME_M),arm64)
	docker-compose -f docker/docker-compose-arm.yaml up --build
else
	echo "$(UNAME_M) is not supported"
endif

down:
ifeq ($(UNAME_M),x86_64)
	docker-compose -f docker/docker-compose.yaml down --remove-orphans
else ifeq ($(UNAME_M),arm64)
	docker-compose -f docker/docker-compose-arm.yaml down --remove-orphans
else
	echo "$(UNAME_M) is not supported"
endif

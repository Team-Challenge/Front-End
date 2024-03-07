include .env

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
	docker-compose up

build-up:
	docker-compose up --build

down:
	docker-compose down --remove-orphans

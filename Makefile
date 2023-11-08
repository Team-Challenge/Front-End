include .env

## Local installation commands
install:
	npm install

start:
	npm start

## Docker commmands
up:
	docker-compose up

build-up:
	docker-compose up --build

down:
	docker-compose down --remove-orphans

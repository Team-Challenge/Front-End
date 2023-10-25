include .env

## Local installation commands
install:
	npm install

start:
	npm start

## Docker commmands
up:
	docker-compose up -d

build-up:
	docker-compose up -d --build

down:
	docker-compose down --remove-orphans
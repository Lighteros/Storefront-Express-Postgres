run-postgres:
	-docker rm -f postgres-storefront
	docker run -d --name postgres-storefront -e POSTGRES_PASSWORD=qwert -e POSTGRES_USER=store -e POSTGRES_DB=storefront -p 5432:5432 postgres:13.3

run-postgres-test:
	-docker rm -f postgres-storefront-test
	docker run -d --name postgres-storefront-test -e POSTGRES_PASSWORD=qwert -e POSTGRES_USER=store -e POSTGRES_DB=test_Storefront -p 5432:5432 postgres:13.3

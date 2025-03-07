docker compose -f docker-compose-local.yml down
docker volume rm $(docker volume ls -q)
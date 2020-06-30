sudo docker-compose -f docker-compose.test.yml -p CI build
sudo docker-compose -f docker-compose.test.yml -p CI up -d
sudo docker logs -f ci_sut_1
docker wait ci_sut_1 || return 1
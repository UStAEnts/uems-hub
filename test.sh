(cd uems-event-micro-dionysus/; tsc)
(cd uems-gateway/; tsc)
docker-compose -f docker-compose.test.yml up --build
# sleep 10
# docker-compose -f docker-compose.test.yml down
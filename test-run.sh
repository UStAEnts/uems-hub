# Creates the uems environment then runs the integration tests.
# Returns error code 0 if successful or 1 if a test failed.
sudo docker-compose -f docker-compose.test.yml -p ci up -d
sudo docker logs -f ci_sut_1
RESULT=$(sudo docker wait ci_sut_1)

sudo docker-compose -f docker-compose.test.yml -p ci down

return $RESULT
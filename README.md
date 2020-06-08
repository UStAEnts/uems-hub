# uems-hub

## Setup

### RabbitMQ

RabbitMQ is provided as a Docker image

```bash
$ cd rabbit-mq-docker
# Build a docker image from the provided Dockerfile and name it `rabbit-uems-image`
# This pulls in the existing configuration file with users, exchanges and queues already setup
$ docker build -t rabbit-uems-image .
# Then run the docker image once this is one, this will attach you to the process (-it) and forwards the ports as shown. You can then access the admin interface on http://localhost:15672
$ docker run -it --name "rabbit-uems" -p 5672:5672 -p 15672:15672 rabbit-uems-image
```

#### User Details

| User          | Password               | Access               |
| ------------- | ---------------------- | -------------------- |
| `xssso`       | `Lrn6t8@P5uH3ONW%9WVf` | `^auth.*$`           |
| `event-micro` | `rEzYuMK6vUaY$u1#1apY` | `^mse.*$`            |
| `rdadmin`     | `5PeztA2*^wGETm8qce*9` | `.*` - administrator |

==NOTE: These password will not be used in production==
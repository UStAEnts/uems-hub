# uems-hub

## Setup

### Microservices

Each microservice is hosted as a different repository but will need to be cloned into this project to get everything up and running correctly. They are all embedded as submodules in this git repository but will require some setup and care for when you pull. 

```bash
# On initial pull, make sure git includes the submodules
$ git clone --recurse-submodules https://github.com/ents-crew/uems-hub.git

# When pulling in the future
$ git pull

# To manually update the submodules to a newer version run this. It will download the new versions and pin the repository at that version
$ git submodule update --remote

# Build endpoint, follow any specific compilation instructions in the git repository if relevant
$ cd endpoint
$ npm i -D
$ npm run build
```

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

## Working on Windows

This project will rely heavily on Docker to deploy microservices. However, docker is not supported at all on Windows 10 Home. If you are wanting to develop on Windows, you will either need a working WSL2 installation and then follow along as if you are on linux, or you will need to run it in another way. I recommend running Vagrant and as such a Vagrantfile is provided in the root of the project. Details on how to setup Vagrant can be found [here](https://www.vagrantup.com/docs/installation). You need some form of virtualisation software available so they recommend installing VirtualBox because it's free.

Then to setup this project do:

```cmd
> vagrant up
> vagrant ssh
$ cd /uems
```

And this should magically setup an ubuntu virtual machine and ssh you into it, navigating to the project folder, at which point you should be able to run the project as described above.

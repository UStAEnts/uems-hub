# uems-hub

## General Technology Stack
![alt text](https://github.com/ents-crew/uems-hub/blob/master/UEMS-Stack.png?raw=true)

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

# If the submodule folders (e.g. uems-evnet-micro-dionysus) are blank then run
$ git submodule update --init
```

### RabbitMQ

#### User Details

| User          | Password               | Access               |
| ------------- | ---------------------- | -------------------- |
| `xssso`       | `Lrn6t8@P5uH3ONW%9WVf` | `^auth.*$`           |
| `event-micro` | `rEzYuMK6vUaY$u1#1apY` | `^mse.*$`            |
| `rdadmin`     | `5PeztA2*^wGETm8qce*9` | `.*` - administrator |
| `endpoint-micro` | `*AWIOX^CiWgMg14tY0Ts` | `^mse.*$` |

==NOTE: These password will not be used in production==

## Working on Windows

Either use WSL2 or something similar. The Vagrantfile has been removed as it was out of date so you can either set it up yourself or there will be a new one coming soon-ish when I go back to running on windows.

## Testing

Integration tests are currently in the process of being rewritten following the major system overhaul so for the time being they are unavailable

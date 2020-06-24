# docker-help

This contains general utilities to setup the docker environment for testing and development. Details of any major changes are sown below

## Postgres

This has a Dockerfile that builds a PostgreSQL instance for the xiomi-v3 web server. It copies in a setup file copied from the live server and modified so it contains an authorized user to test the system with

|User|Password|
|---|---|
|test-floe|test-flow123|

The security questions are either 'a', 'b', or 'c' but I can't remember which is which. 
sleep 5 # Wait to allow the system to startup completely - There must be a better way to do this.
pytest -q --tb=line --capture=tee-sys
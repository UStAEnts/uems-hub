Vagrant.configure(2) do |config|
	config.vm.box = "generic/ubuntu1904"

	# Install docker
	config.vm.provision :docker

	# Then install docker compose
	config.vm.provision :docker_compose

	# Then forward all the ports we need
	config.vm.network "forwarded_port", guest: 15672, host: 15672 # RabbitMQ Management Interface
	config.vm.network "forwarded_port", guest: 5672, host: 5672   # RabbitMQ Direct Access
	config.vm.network "forwarded_port", guest: 3000, host: 3000   # Server HTTP Port (when in use)
	config.vm.network "forwarded_port", guest: 3001, host: 3001   # Server HTTPS Port

	# Then forward this project folder to /uems on the host machine
	config.vm.synced_folder ".", "/uems"
end
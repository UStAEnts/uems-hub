pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "Building... Build ID ${env.BUILD_ID}"
                sh "docker-compose -f docker-compose.test.yml -p CI build"
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh "docker-compose -f docker-compose.test.yml -p CI up -d"
                sh 'docker wait ci_sut_1 || true' 
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

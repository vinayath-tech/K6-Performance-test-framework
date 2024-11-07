pipeline {
    agent any

    tools {nodejs "Latest node"}

    stages {
        stage('Checkout branch') {
            steps {
                git branch: 'main', url: 'https://github.com/vinayath-tech/K6-Performance-test-framework.git'
            }
        }
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                sh 'sudo chmod +x setup_k6.sh'
                sh 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                sh 'k6 run ./performance-tests/smoke-test.js'
            }
        }
    }

}

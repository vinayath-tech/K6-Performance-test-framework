pipeline {
    agent any

    tools {nodejs "nodejs"}

    stages {
        stage('Checkout branch') {
            steps {
                git branch: 'main', url: 'https://github.com/vinayath-tech/K6-Performance-test-framework.git'
            }
        }
        stage('Performance Testing') {
            steps {
                echo 'Execute Perf test'
                sh 'npm run test:smoke'
            }
        }
    }

}

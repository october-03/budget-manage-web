pipeline {
  agent any

  stages {
    stage('github-clone') {
      steps {
        git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/october-03/budget-manage-web.git'
        sh '''
          touch .env
          echo "REACT_APP_BASE_URL=$REACT_APP_BASE_URL" >> .env
        '''
      }
    }

    stage('build') {
      steps {
        sh 'docker build -t budget-manage-web .'
      }
    }

    stage('deploy') {
      steps {
        sh 'docker stop budget-manage-web'
        sh 'docker run -d -p 61902:80 --name budget-manage-web budget-manage-web'
      }
    }
  }
}
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
        slackSend (
          channel: "#jenkins_alert",
          color: "#FFFF00",
          botUser: true,
          message: "BUILD START: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
        )
      }
    }

    stage('build') {
      steps {
        sh 'docker build -t budget-manage-web .'
      }
    }

    stage('stop container') {
      steps {
        script {
          try {
            sh 'docker stop budget-manage-web'
            sh 'docker rm budget-manage-web'
          } catch (e) {
            echo 'No container to stop'
          }
        }
      }
    }

    stage('deploy') {
      steps {
        sh 'docker run -d -p 61902:80 --name budget-manage-web budget-manage-web'
      }
    }
  }
  post {
    success {
      slackSend (
        channel: "#jenkins_alert",
        color: "#00FF00",
        botUser: true,
        message: "BUILD SUCCESS: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
      )
    }
    failure {
      slackSend (
        channel: "#jenkins_alert",
        color: "#FF0000",
        botUser: true,
        message: "BUILD FAILURE: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
      )
    }
  }
}
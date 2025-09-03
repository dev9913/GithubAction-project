@Library('mylib') _

pipeline {
  
  agent { label 'agentdev' }

  parameters {
        string(name: 'IMAGE_TAG', defaultValue: 'v1.0', description: 'Docker image tag to deploy')
  }
  environment {  
    AWS_DEFAULT_REGION = "us-east-1"
  }

  stages {
    
    stage('Code_Check') {
      steps {
        script {
          code_check("https://github.com/dev9913/GithubAction-project.git", "main")
        }
      }
    }

    stage('Build_Image') {
      steps {
        script {
          imagebuild("wheatherapp", "${params.IMAGE_TAG}", "dev7878")
        }
      }
    }

    stage('Image_Push') {
      steps {
        script {
          dockerpush("wheatherapp", "${params.IMAGE_TAG}", "dev7878")
        }
      }
    }
     // stage('Frontend_Build') {
     //        steps {
     //            sh "npm install"
     //            sh "npm run build "
     //        }
     //    }

    stage('AWS_Login') {
      steps {
         withCredentials([usernamePassword(
                    credentialsId: 'my_aws_credential',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                )]) {
          sh " aws s3 ls "  
          echo "insert the file into s3 buckets ."
          //  sh "  aws s3 sync . s3://thisbuketforjenkins"
           sh "  aws s3 sync build/ s3://thisbuketforjenkins"
          echo "Successfull !!" 
        }
      }
    }
    stage('Update K8s Manifest') {
            steps {
                script {
                    // Replace image in deployment.yaml (assuming line has "image: ...")
                    sh """
                        sed -i "s|image: .*|image: ${params.IMAGE_TAG}|g" k8s/deployment.yaml
                    """
                }
            }
        }

  }
}


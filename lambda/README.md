# AWS Lambda to Store Embedding in S3 Bucket

Lambda endpoint is deployed as a [container](https://docs.aws.amazon.com/lambda/latest/dg/python-image.html) image.

To deploy:

- First create an Elastic Container Registry (ECR) in AWS.
- Build the docker image, tag it to the ECR and push.

```
build.sh

# Step 2: Authenticate Docker to your Amazon ECR registry
aws ecr get-login-password --region region | docker login --username AWS --password-stdin your-account-id.dkr.ecr.region.amazonaws.com

# Step 3: Build your Docker image
docker build -t your-image-name .

# Step 4: Tag your Docker image
docker tag your-image-name:latest your-account-id.dkr.ecr.region.amazonaws.com/your-image-name:latest

# Step 5: Push your Docker image to your ECR repository
docker push your-account-id.dkr.ecr.region.amazonaws.com/your-image-name:latest
```

- Set up AWS Lambda based on the deployed docker image in ECR.
- Link the lambda endpoint through API Gateway.
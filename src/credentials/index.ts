/**
 * AWS Credentials Definition
 */

export const AWSCredential = {
  name: "awsCredential",
  displayName: "AWS",
  description: "AWS credentials for DynamoDB access",
  properties: {
    accessKeyId: {
      type: "string",
      title: "Access Key ID",
      description: "Your AWS access key ID",
      required: true,
    },
    secretAccessKey: {
      type: "string", 
      title: "Secret Access Key",
      description: "Your AWS secret access key",
      required: true,
      "ui:widget": "password",
    },
    region: {
      type: "string",
      title: "Region",
      description: "AWS region (e.g., us-east-1)",
      default: "us-east-1",
      required: true,
    },
  },
};

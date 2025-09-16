import { getPlatformDependencies, type EnhancedNodeDefinition } from "@gravityai-dev/plugin-base";
import { DynamoDBExecutor } from "./executor";

export const NODE_TYPE = "DynamoDB";

function createNodeDefinition(): EnhancedNodeDefinition {
  const { NodeInputType } = getPlatformDependencies();
  
  return {
    packageVersion: "1.0.9",
    type: NODE_TYPE,
    name: "DynamoDB",
    description: "Upload a record to an AWS DynamoDB table",
    category: "storage",
    logoUrl: "https://res.cloudinary.com/sonik/image/upload/v1751473913/gravity/icons/DynamoDB.png",
    color: "#4B61D1", // AWS DynamoDB Blue

    inputs: [
      {
        name: "signal",
        type: NodeInputType.OBJECT,
        description: "Record data to upload (can override config record)",
      },
    ],

    outputs: [
      {
        name: "success",
        type: NodeInputType.BOOLEAN,
        description: "Whether the upload was successful",
      },
      {
        name: "itemId",
        type: NodeInputType.STRING,
        description: "ID of the uploaded item (if available)",
      },
    ],

    configSchema: {
      type: "object",
      required: ["tableName", "record"],
      properties: {
        tableName: {
          type: "string",
          title: "Table Name",
          description: "Name of the DynamoDB table",
        },
        record: {
          type: "object",
          title: "Code",
          description: "JS Code to transform data",
          default: "",
          "ui:field": "template",
        },
        conditionExpression: {
          type: "string",
          title: "Condition Expression",
          description: "Optional condition that must be satisfied for the put to succeed",
          default: "",
        },
        expressionAttributeNames: {
          type: "object",
          title: "Expression Attribute Names",
          description: "Substitution tokens for attribute names in expressions (optional)",
          default: {},
          "ui:field": "JSON",
        },
        expressionAttributeValues: {
          type: "object",
          title: "Expression Attribute Values",
          description: "Values that can be substituted in expressions (optional)",
          default: {},
          "ui:field": "JSON",
        },
      },
    },

    credentials: [
      {
        name: "awsCredential",
        required: true,
        displayName: "AWS",
        description: "AWS credentials for DynamoDB access",
      },
    ],
  };
}

const definition = createNodeDefinition();

export const DynamoDBNode = {
  definition,
  executor: DynamoDBExecutor,
};

export { createNodeDefinition };

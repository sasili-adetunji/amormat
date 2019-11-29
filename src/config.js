
export default {
    s3: {
      REGION: "us-east-1",
      BUCKET: "sasil-amormat-uploads"
    },
    apiGateway: { //TODO :// edit the identity pool dashboard to add lambda api
      REGION: "us-east-1",
      // URL: "https://cors-anywhere.herokuapp.com/https://6m3dp1t6qc.execute-api.us-east-1.amazonaws.com/prod"
      URL: "https://6m3dp1t6qc.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_C3v27VkJ5",
      APP_CLIENT_ID: "2082gulojtdlsaqo5qekoml7vt",
      IDENTITY_POOL_ID: "us-east-1:7ed5deda-6efb-4031-b136-52641499b71e"
    }
  };

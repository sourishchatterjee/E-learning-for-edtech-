module.exports = {
    // Define application configuration
    appRoot: {
      env: process.env.NODE_ENV || "development",
      isProd: process.env.NODE_ENV === "production",
      host: process.env.HOST || "localhost",
      port: process.env.PORT || 3005,
      appName: process.env.APP_NAME || "newProjectSetup",
      getApiFolderName: process.env.API_FOLDER_NAME || "api",
      getUserFolderName: process.env.USER_FOLDER_NAME || "user",
      getWebFolderName: process.env.WEB_FOLDER_NAME || "webservices",
    },
  };
  
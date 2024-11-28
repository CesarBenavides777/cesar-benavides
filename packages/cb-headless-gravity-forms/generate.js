require('dotenv').config();
const { execSync } = require('child_process');

execSync('graphql-codegen --config graphql.config.yaml --errors-only', {
  stdio: 'inherit'
});

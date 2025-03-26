// app.config.js
import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    RPC_URL: process.env.RPC_URL,
  },
});

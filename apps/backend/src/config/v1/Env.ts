const decimalBase = 10;
export const env = {
  port: parseInt(process.env.PORT, decimalBase) || 5000,
  mongoUri: process.env.MONGO_URI,
  authSecret: process.env.AUTH_SECRET,
  authExpirationTime: process.env.AUTH_EXPIRATION_TIME,
  salt: parseInt(process.env.SALT, decimalBase),
  where: process.env.WHERE,
};

Object.freeze(env);

module.exports = {
  HOST: process.env.DB_HOST || "127.0.0.1",
  PORT: process.env.DB_PORT || 27017,
  DB: process.env.DB_NAME || "ecommercedb"
};

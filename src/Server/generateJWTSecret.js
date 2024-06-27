const crypto = require('crypto');

// Generate a random JWT secret key
const generateJWTSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

console.log(generateJWTSecret());

const crypto = require("crypto");

const generateVerificationCode = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

const hashVerificationCode = (code) => {
  return crypto
    .createHash("sha256")
    .update(code)
    .digest("hex");
};

module.exports = {
  generateVerificationCode,
  hashVerificationCode
};
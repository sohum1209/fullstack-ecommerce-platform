const express = require("express");
const router = express.Router();
const { sendVerificationEmail, verifyEmail } = require("../controllers/emailVerification");

router.post("/send-verification-email", sendVerificationEmail);
router.post("/verify-email", verifyEmail);

module.exports = router;
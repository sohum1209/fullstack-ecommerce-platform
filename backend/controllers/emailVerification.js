const userVerification = require("../models/userVerification");
const User = require("../models/user");
const { hashVerificationCode, generateVerificationCode } = require("../utils/crypt")
const sendEmail = require("../utils/verificationMail");

const sendVerificationEmail = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const generatedOtp = generateVerificationCode();
        // console.log("Generated OTP:", generatedOtp); // Log the generated OTP for debugging
        await sendEmail(user.email, generatedOtp);

        const hashedOtp = await hashVerificationCode(generatedOtp);
        const verification = new userVerification({
            userId: userId,
            otp: hashedOtp,
        });
        await verification.save();
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const verifyEmail = async (req, res) => {
    try{
        const { userId, otp } = req.body;
        const hashedOtp = await hashVerificationCode(otp);
        const user = await userVerification.findOne({ otp: hashedOtp });
        if(!user) return res.status(400).json({message: "Invalid Otp"});
        
        const userToVerify = await User.findById(userId);
        if (!userToVerify) return res.status(404).json({ message: "User not found" });

        userToVerify.isVerified = true;
        await userToVerify.save();

        await userVerification.findOneAndDelete({ userId: userId });

        res.status(200).json({ message: "Email verified successfully" });
    }
    catch(error){
        console.error("Error verifying email:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {sendVerificationEmail, verifyEmail}
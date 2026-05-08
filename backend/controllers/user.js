require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function SignUpUser(req, res) {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {

        const user = await User.create({
            name,
            email,
            phone,
            password: password
        });

        return res.status(201).json({
            message: "User Created Successfully",
            userId: user._id
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email already exists" });
        }

        return res.status(500).json({ error: error.message });
    }
}

async function LoginUser(req, res) {
    const { email, password } = req.body;

    const sign = (user) => jwt.sign({ id: user._id || user.id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY });

    if (!email || !password) {
        return res.status(400).json({ message: "Login credentials are missing" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) return res.status(401).json({ error: "Invalid credentials" });
        const payload = { id: user._id || user.id, email: user.email };
        console.log("Login token payload:", payload);
        res.json({ token: jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY }), name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ error });
    }

}

module.exports = { SignUpUser, LoginUser }
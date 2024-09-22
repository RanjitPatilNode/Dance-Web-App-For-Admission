const User = require("../models/user");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const user = require("../models/user");
// const user = require("../models/user");
// const User = require("../models/user");

dotenv.config();

exports.register = async (req, resp) => {
    try {
        const { email, username, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();
        resp.status(201).json({ message: "user  registered successfully" })
    } catch (error) {
        resp.status(400).json({ error: error.message })
    }
}
exports.login = async (req, resp) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            resp.status(404).json({ error: "User not found" })
        }
        const isMatched = await existingUser.comparePassword(password)
        if (!isMatched) {
            return resp.status(400).json({ error: "Invalid Credentials" })
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        resp.json(token)

    } catch (error) {
        resp.status(400).json({ error: error.message })
    }
}
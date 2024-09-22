const user = require("../models/user");
const User = require("../models/user")

exports.creatUser = async (req, resp) => {
        try {
                const { username, email, password } = req.body;
                const userData = new User({
                        username,
                        email,
                        password,
                        photo: req.file ? req.file.path : null,
                })
                await userData.save();
                resp.status(201).json(userData)
        } catch (error) {
                resp.status(400).json({
                        error: error.message
                })
        }
}
exports.getUser = async (req, resp) => {
        try {
                const serachedUser = await User.findById(req.params.id)
                if (!serachedUser) {
                        resp.status(404).json({ error: "User not found" })
                }
                resp.json(serachedUser);
        } catch (error) {
                resp.status(400).json({ error: error.message })
        }
}
exports.updateUser = async (req, resp) => {
        try {
                const { username, email, password } = req.body
                const updateData = {
                        username,
                        email,
                        password,
                        updatedAt: Date.now(),
                };

                if (req.file) {
                        updateData.photo = req.file.path;
                }
                const userData = await User.findByIdAndUpdate(req.params.id, updateData, { new: true })
                if (!userData) {
                        return resp.status(400).json({ error: "User not found" })
                }
                resp.json(userData)

        } catch (error) {
                resp.status(400).json({ error: error.message })
        }
}
exports.deletUser = async (req, res) => {
        try {
                const deletUser = await user.findByIdAndDelete(req.params.id)
                if (!deletUser) {
                        resizeBy.status(404).json({ message: "User not found" })
                }
                res.json({ message: "user deleted" })
        } catch (error) {
                res.status(400).json({ error: error.message })
        }
}
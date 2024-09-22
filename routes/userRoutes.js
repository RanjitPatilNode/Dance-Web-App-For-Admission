const express = require("express")
const router = express.Router();
const multer = require("multer");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const { login } = require("../controllers/authControllers");
const authControllers = require("../controllers/authControllers")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: storage })

// login
router.post("/register",authControllers.register)
router.post("/login",authControllers.login)


router.post("/users", upload.single("photo"), userController.creatUser);
router.get("/users/:id",auth, userController.getUser)
router.put("/users/:id",auth, userController.updateUser)
router.delete("/users/:id",auth,userController.deletUser)
// router.get("/users/:id",userController.getUser)


module.exports = router; 

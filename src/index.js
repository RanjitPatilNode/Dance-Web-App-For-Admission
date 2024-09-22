const express = require("express")
const dotenv = require("dotenv");
const { dbConnect } = require("../config/dbConn");
const app = express()
// const multer = require("multer")
const User = require("../models/user");
const router = require("../routes/userRoutes");
const cors = require('cors')

dotenv.config();
dbConnect();

app.use(cors({
    origin: 'http://localhost:5173'
}));
const port = process.env.PORT;
const hostname = process.env.HOSTNAME

//  app.get('/api/v1/users', (req , resp)=>{
//     resp.status(200).json({name:"abc", age:24,city:"pune" })
//  })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)



app.listen(port, () => {
    console.log(`http://${hostname}:${port}`)
})


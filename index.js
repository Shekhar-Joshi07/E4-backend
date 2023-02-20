const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./routes/User.routes")
const {postRouter} = require("./routes/Post.routes")
const {authenticate} = require("./middlewares/authenticate.middleware")
const cors = require("cors")
require("dotenv").config();
const app = express();

app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{
    res.send("Welcome to Linkedin app")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts", postRouter)

app.listen(9090,async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log(error.message)
       

        
    }
    console.log(`server is running at port ${process.env.PORT}`);
})
const express = require("express")
const {UserModel} = require("../models/User.model")
const jwt = require("jsonwebtoken")
const userRouter = express.Router()

const bcrypt =require("bcrypt");


userRouter.post("/register", async(req,res)=>{
    const {name, email, password, age, city } = (req.body)
    try {
        bcrypt.hash(password, 5, async(err,hash)=>{
            if(err) res. send ({"msg":"Oops ! Something went wrong here", "error":err.message})
            else{
                const user = new UserModel({name,email,password:hash,age,city})
                await user.save()
                res.send ({"msg":"New users has been registered successfully"})
            }
        })
    } catch (error) {
        res.send ({"msg":"Oops ! Something went wrong here", "error":err.message})
    }
})


 userRouter.post("/login", async(req,res)=>{
    const {email,password}= (req.body)
    try {
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result) {
                    let token = jwt.sign({userID:user[0]._id},"backend")
                    res.send({"msg":"Logged in successful","token":token})
                }else{
                    res.send({"msg":"Invalid Credentials"})
                }
            });
        }else{
            res.send({"msg":"Invalid Credentials"})
        }
    } catch (error) {
        res.send ({"msg":"Oops ! Something went wrong here", "error":err.message})
    }
 })

module.exports = {userRouter}
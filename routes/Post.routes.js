const express = require("express")
const postRouter = express.Router()

const {PostModel} = require("../models/Post.model")

postRouter.get("/", async(req,res)=>{
    try {
        const data = await PostModel.find({user:req.body.user});
        res.send({success:true, data});
    } catch (error) {
        res.send({error:error.message});
        
    }
});

postRouter.post("/create",async(req,res)=>{
    try {
        await PostModel.create(req.body);
        res.send({ "msg": "post has successfully added" });
    } catch (error) {
        res.send({ "error": error.message });
    }
});

postRouter.delete("/delete/:id",async(req,res)=>{
    try {
        const data= await PostModel.findByIdAndDelete(req.params.id);
         res.send({ "success": true, "deleted": data });
     } catch (error) {
         res.send({ "error":error.message });
     }
 });

 postRouter.patch("/update/:id", async (req, res) => {
    try {
       await PostModel.findByIdAndUpdate(req.params.id,req.body);
        res.send({ "success": true,"message":" Post Successfully updated"});
    } catch (error) {
        res.send({ "error": error.message });
    }
});


module.exports={
    postRouter
}
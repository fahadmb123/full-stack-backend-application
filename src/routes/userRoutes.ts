import express from "express"
const router = express.Router()




router.get("/register",(req,res)=>{
    console.log("Hey yooo")
    res.send("Hey Dominic")
})


export default router
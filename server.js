const express=require("express")
const app=express()
const cors=require("cors")
const nodemailer=require("nodemailer")
const dotenv=require("dotenv").config()

let USER=process.env.USER
let PASS=process.env.PASS

app.use(express.json())
app.use(cors())


let notificationMail=async(res,name,mail,message)=>{
    try {
        let transporter=nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:USER,
                pass:PASS
            }
        });

console.log(process);
        let info=await transporter.sendMail({
            from:USER,
            to:USER,
            subject:"PORTFOLIO NOTIFICATION",
            html:`<p>Name: <b>${name}</b></p>
                  <p>Email:<b>${mail}</b> </p>
                  <h4>${message}</h4>`
        });

        res.json({message:"Thanks for your interest.I got your message,will get back to you soon...!!!"});
  
    } catch (error) {
        res.status(500).json({message:"Sorry,something went wrong,please try again"})
    }
}


app.post("/portfolio",async(req,res)=>{
    try {
        let name=req.body.name;
        let mail=req.body.email;
        let message=req.body.message;

        notificationMail(res,name,mail,message);
    } catch (error) {
        res.status(500).json({message:"Sorry,something went wrong,please try again"})
    }
})








app.listen(process.env.PORT || 3001)
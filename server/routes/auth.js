const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
// 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

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

router.post('/signup',(req,res)=>{
    const {name,email,password,pic}=req.body
    if(!name || !email ||!password){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user alreadt exist with that email"})
        }
        bcrypt.hash(password,12)
        .then((hashedpassword)=>{
            const user = new User({
                name,
                email,
                password:hashedpassword,
                pic
            })
            user.save()
            .then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"no-reply@insta.com",
                    subject:"SIGNUP SUCESS",
                    html:"<h1>Welcome to Instagram-Clone</h1>"
                })
                res.json({message:"signup succesfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email ||!password){
        return res.status(422).json({error:"please provide email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router
const express = require('express')
const app = express()
const PORT= process.env.PORT || 5000
const mongoose=require('mongoose')
const { MONGOURI }=require('./server/config/keys')

mongoose.connect(MONGOURI ,{ useNewUrlParser: true , useUnifiedTopology: true })
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./server/models/user')
require('./server/models/post')

app.use(express.json())

app.use(require('./server/routes/auth'))
app.use(require('./server/routes/post'))
app.use(require('./server/routes/user'))

if (process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
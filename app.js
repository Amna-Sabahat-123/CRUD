const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('./usermodal')
const usermodal = require('./usermodal')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/read',async (req,res)=>{
    let users = await usermodal.find()
    res.render('read',{users})
})
app.get('/edit/:userid',async (req,res)=>{
    let user = await usermodal.findOne({_id : req.params.userid})
    res.render("edit",{user})
})
app.post('/update/:userid',async (req,res)=>{
    let {name, email, img} = req.body;
    let user = await usermodal.findOneAndUpdate({_id: req.params.userid}, {name, email, img}, {new: true})
    res.redirect("/read")
})
app.get('/delete/:id',async (req,res)=>{
    let users = await usermodal.findOneAndDelete({_id: req.params.id})
    res.redirect('/read')
})

app.post('/create',async (req,res)=>{
    let {name, email, img} = req.body
    let createdUser = await usermodal.create({
        name, 
        email, 
        img
    })
    res.redirect('/read')
})

app.listen('3000')
const Memos = require ('../Models/memo.js')
const jwt = require('jsonwebtoken')
const Storage = require('dom-storage')
const localStorage = new Storage ('./db.json',{strict: false,ws:' '})
const Token = localStorage.getItem('myKey')
require('dotenv').config()

function Home (req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    let user = jwt.verify(Token, process.env.SECRET)
    Memos.find({user_id: user._id},function(err,memos){
        let user = jwt.verify(Token, process.env.SECRET)
        res.render('index', {memos: memos,user: user})  
    })
  }  
}

function createMemo (req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    let user = jwt.verify(Token, process.env.SECRET)
    Memos.create({
       memo:req.body.memo,
       created_at: new Date().toUTCString(), 
       user_id: user._id
     },function(err,result){
       res.redirect('/')
     })
   }
 }
 
 function editMemo (req,res,next){
   if(!Token){
     res.redirect('/login')
   }
   else{
     Memos.findOne({
       _id: req.params.id
     },function(err,result){
       res.render('editMemo',{memo: result})
     })
   }
 }
 
 function updateMemo (req,res,next){
   if(!Token){
     res.redirect('/login')
   }
   else{
     Memos.updateOne({
       _id: req.params.id
     },{
       memo: req.body.memo,
       created_at: new Date().toUTCString()
     },function (err,result){
       res.redirect(`/`)
     })
   }
 }
 
 function deleteMemo (req,res,next){
   if(!Token){
     res.redirect('/login')
   }
   else{
     Memos.remove({
       _id: req.params.id
     },function(err,result){
       res.redirect('/')
     })
   }
 }
 
 module.exports = {
   Home,createMemo,editMemo,updateMemo,deleteMemo
 }
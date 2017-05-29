const Users = require ('../Models/User.js')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')
const saltRounds = 10
const Storage = require ('dom-storage')
const localStorage = new Storage('./db.json',{strict:false,ws:' '})
const Token = localStorage.getItem('myKey')
require('dotenv').config()


function signupScreen (req,res,next){
  res.render('signup')
}

function signup (req,res,next){
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(req.body.password,salt)
  Users.find({
    username: req.body.username
  },function(err,user){
  //   if(user.length > 0){
  //     res.redirect('/signup', {message: 'Username already exist!'})
  //   }
  //   if (req.body.password.split('').length < 4){
  //     res.redirect('/signup', {message: "Password must be 4 characters or more!"})
  //   }
  //  else{
    Users.create({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      role: "User"
    },function(err,result){
      res.redirect('/login')
    })
  //  }
  })
}

function loginScreen (req,res,next){
  res.render('login')
}

function login (req,res,next){
  Users.findOne({
    username: req.body.username
  },function(err,result){
    if(result === null){
      res.render('login')
    }
    else{
      if(bcrypt.compare(req.body.password, result.password)){
        var token = jwt.sign({_id: result.id, username: result.username, role: result.role},process.env.SECRET)
        localStorage.setItem('myKey',token)
        res.redirect('/')
      }
    }    
  })
}

function editProfile (req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    Users.findOne({
      _id: req.params.id
    },function(err,result){
      //let password = result.password.replace(/[0-9,a-z,A-Z]/gi,"*")
      res.render('editProfile', {user: result})
    })
  }
}

function updateProfile (req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    if(req.body.password.split('').length < 4){
      res.redirect('/editProfile')
    }
    Users.findOne({
      _id: req.params.id
    },function(err,result){
      Users.updateOne({
        _id: req.params.id
      },{
        username: req.body.username || result.username,
        password: req.body.password || result.password,
        email: req.body.email || result.email
      },function(err,last){
        res.redirect('/')
      })
    })
  }
}

function logout (req,res,next){
  if(!Token){
    res.redirect('/login')
  }
  else{
    localStorage.removeItem('myKey')
    res.render('login')
  }
}

function deleteUser (req,res,next){
  Users.remove({
    _id: req.params.id
  },function(err,result){
    res.redirect('/listUser')
  })
}

function UserList (req,res,next){
  Users.find({},function(err,results){
    let userrole= jwt.verify(Token,process.env.SECRET)
    res.render('listUser', {users:results, role: userrole})
  })
}

module.exports = {
  signupScreen,signup,login,editProfile,updateProfile,logout,deleteUser,UserList,loginScreen
}
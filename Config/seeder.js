const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const saltRounds=10

exports.insertuser=()=>{
    User.findOne({'email':'admin@gmail.com'}).exec()
    .then(userobj=>{
        if(userobj==null)
        {
            let userobj=new User()
            userobj.email='admin@gmail.com'
            userobj.password=bcrypt.hashSync('admin',saltRounds)
            userobj.userType = 0
            userobj.save()
            console.log('Admin Registered')
        }
    })
    .catch(err=>{
        console.log("Admin Already Register")
    })
}
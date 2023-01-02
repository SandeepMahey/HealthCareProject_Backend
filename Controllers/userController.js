const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretkey='nodeproject@abc'
function login(req,res)
{
    var validators=''
    if(req.body.email=='' || req.body.email==undefined)
    {
        validators+="Email is required\n"
    }
    if(req.body.password=='' || req.body.password==undefined)
    {
        validators+="Password is required"
    }
    if(!!validators)
    {
        res.json({
            "status":422,
            "success":false,
            "message":validators
        })
    }
    User.findOne({'email':req.body.email}).exec()
    .then(userobj=>{
        if(userobj==null)
        {
            res.json({
                "status":200,
                "success":false,
                "message":"Email does not exist"
            })
        }
        else{
            if(bcrypt.compareSync(req.body.password,userobj.password))
            {
                let payload={
                    '_id':userobj._id,
                    'userType':userobj.userType,
                    'email':userobj.email
                }
                const token=jwt.sign(payload,secretkey,{expiresIn:60*10})
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Login Successfully",
                    "data":userobj,
                    "token":token
                })
            }
            else{
                res.json({
                    "status":200,
                    "success":false,
                    "message":"Invalid Password"
                })
            }
        }
    })
    .catch(err=>{
        res.json({
            "status":500,
            "success":false,
            "message":String(err)
        })
    })
}

module.exports={
    login
}
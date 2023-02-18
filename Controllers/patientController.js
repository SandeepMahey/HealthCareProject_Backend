const Patient=require('../Models/patientModel')
const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const saltRounds=10
const jwt=require('jsonwebtoken')
const secretkey='nodeproject@abc'
function register(req,res)
{
    var validations=''
    if(req.body.patient_name=='' || req.body.patient_name==undefined)
    {
        validations+='patient_name is required'
    }
    if(req.body.dob=='' || req.body.dob==undefined)
    {
        validations+='dob is required'
    }
    if(req.body.age=='' || req.body.age==undefined)
    {
        validations+='age is required'
    }
    if(req.body.gender=='' || req.body.gender==undefined)
    {
        validations+='gender is required'
    }
    if(req.body.address=='' || req.body.address==undefined)
    {
        validations+='address is required'
    }
    if(req.body.email=='' || req.body.email==undefined)
    {
        validations+='email is required'
    }
    if(req.body.password=='' || req.body.password==undefined)
    {
        validations+='password is required'
    }if(req.body.contact_number=='' || req.body.contact_number==undefined)
    {
        validations+='contact number is required'
    }
    if(!!validations)
    {
        res.json({
            "status":422,
            "success":false,
            "message":validations
        })
    }
    else{
        User.findOne({'email':req.body.email}).exec()
        .then(data=>{
            if(data==null)
            {
                let userobj=new User()
                userobj.email=req.body.email
                userobj.password=bcrypt.hashSync(req.body.password,saltRounds)
                userobj.userType=1
                userobj.save()
                .then(userobj=>{
                    let patientobj=new Patient()
                    patientobj.userId=userobj._id
                    patientobj.patient_name=req.body.patient_name
                    patientobj.dob=req.body.dob
                    patientobj.age=req.body.age
                    patientobj.gender=req.body.gender
                    patientobj.address=req.body.address
                    patientobj.email=req.body.email
                    patientobj.password=req.body.password
                    patientobj.contact_number=req.body.contact_number
                    patientobj.save()
                    res.json({
                        "status":200,
                        "success":true,
                        "message":"Patient Registered"
                    })
                })
                .catch(err=>{
                    res.json({
                        "status":500,
                        "success":false,
                        "message":String(err)
                    })
                })
            }
            else{
                res.json({
                    'status':200,
                    'success':false,
                    'message':"User Already exists"
                })
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
}
function login(req,res)
{
    var validations=''
    if(req.body.email=='' || req.body.email==undefined)
    {
        validations+='email is required'
    }
    if(req.body.password=='' || req.body.password==undefined)
    {
        validations+='password is required'
    }
    if(!!validations)
    {
        res.json({
            "status":422,
            "success":false,
            "message":validations
        })
    }
    else{
        User.findOne({'email':req.body.email}).exec()
        .then(data=>{
            if(data==null)
            {
                res.json({
                    "status":200,
                    "success":false,
                    "message":"Email does not exist"
                })
            }
            else{
                if(bcrypt.compareSync(req.body.password,data.password))
                {
                    let payload={
                        '_id' : data._id,
                        'userType' :data.userType,
                        'name' : data.name,
                        'email' : data.email,
                    }
                    const token=jwt.sign(payload,secretkey,{expiresIn:60*10})
                    res.json({
                        'status':200,
                        'success':true,
                        'message':"login successfully",
                        'data':data,
                        'token':token
                    })
                }
                else{
                    res.json({
                        'status':200,
                        'success':false,
                        'message':"Invalid password"
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
}
function changepassword(req,res)
{
    var validations=''
    if(req.body.email=='' || req.body.email==undefined)
    {
        validations+='email is required'
    }
    if(req.body.new_password=='' || req.body.new_password==undefined)
    {
        validations+='new_password is required'
    }
    if(req.body.old_password=='' || req.body.old_password==undefined)
    {
        validations+='old_password is required'
    }
    if(req.body.confirm_password=='' || req.body.confirm_password==undefined)
    {
        validations+='confirm_password is required'
    }
    if(!!validations)
    {
        res.json({
            "status":422,
            "success":false,
            "message":validations
        })
    }
    if(req.body.new_password==req.body.confirm_password)
    {
        User.findOne({'email':req.body.email}).exec()
        .then(userobj=>{
            if(userobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Email does not exist"
                })
            }
            else{
                if(bcrypt.compareSync(req.body.old_password,userobj.password))
                {
                    userobj.password=bcrypt.hashSync(req.body.new_password,saltRounds)
                    userobj.save()
                    res.json({
                        "status":200,
                        "success":true,
                        "message":"Password Updated"
                    })
                }
                else{
                    res.json({
                        "status":200,
                        "success":false,
                        "message":"old password does not match"
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
    else{
        res.json({
            "status":200,
            "success":false,
            "message":"New and Confirm Password does not match"
        })
    }
}
function resetpassword(req,res)
{
    var validations=''
    if(req.body.email=='' || req.body.email==undefined)
    {
        validations+='email is required'
    }
    if(req.body.new_password=='' || req.body.new_password==undefined)
    {
        validations+='new_password is required'
    }
    if(req.body.confirm_password=='' || req.body.confirm_password==undefined)
    {
        validations+='confirm_password is required'
    }
    if(!!validations)
    {
        res.json({
            "status":422,
            "success":false,
            "message":validations
        })
    }
    if(req.body.new_password==req.body.confirm_password)
    {
        User.findOne({'email':req.body.email}).exec()
        .then(userobj=>{
            if(userobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Email does not exist"
                })
            }
            else
                {
                    userobj.password=bcrypt.hashSync(req.body.new_password,saltRounds)
                    userobj.save()
                    res.json({
                        "status":200,
                        "success":true,
                        "message":"Password Updated"
                    })
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
    else{
        res.json({
            "status":200,
            "success":false,
            "message":"New and Confirm Password does not match"
        })
    }
}
function viewallpatient(req,res)
{
    console.log(req.body)
    Patient.find(req.body).populate('userId').exec()
    .then(patientobj=>{
        res.json({
            "status":200,
            "success":true,
            "message":"Patient data Loaded",
            "data":patientobj
        })
    })
    .catch(err=>{
        res.json({
            "status":500,
            "success":false,
            "message":String(err)
        })
    })
}
function viewsinglepatient(req,res)
{
    if(req.body._id==null || req.body._id==undefined)
    {
        res.json({
            "status":422,
            "success":false,
            "message":"_id is required"
        })
    }
    else{
        Patient.findOne({'_id':req.body._id}).populate('userId').exec()
        .then(patientobj=>{
            if(patientobj!=null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Patient Data Loaded",
                    "data":patientobj
                })
            }
            else{
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Patient Data Loaded",
                    "data":[]
                })
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
}

module.exports={
    register,
    login,
    changepassword,
    resetpassword,
    viewallpatient,
    viewsinglepatient
}

















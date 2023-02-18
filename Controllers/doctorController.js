const Doctor=require('../Models/doctorModel')
const bcrypt=require('bcrypt')
const saltRounds=10

function adddoctor(req,res){
    console.log(req.body)
    var validations=''
    if(req.body.doctor_name=='' || req.body.doctor_name==undefined)
    {
        validations+="doctor_name is required\n"
    }
    if(req.body.qualification=='' || req.body.qualification==undefined)
    {
        validations+="qualification is required\n"
    }
    if(req.body.specialization=='' || req.body.specialization==undefined)
    {
        validations+="specialization is required\n"
    }
    if(req.body.experience=='' || req.body.experience==undefined)
    {
        validations+="experience is required\n"
    }
    if(req.body.email=='' || req.body.email==undefined)
    {
        validations+="email is required\n"
    }
    if(req.body.password=='' || req.body.password==undefined)
    {
        validations+="password is required\n"
    }
    if(req.body.contact_number=='' || req.body.contact_number==undefined)
    {
        validations+="contact number is required\n"
    }
    if(req.body.address=='' || req.body.address==undefined)
    {
        validations+="address is required\n"
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
        Doctor.findOne({'doctor_name':req.body.doctor_name}).exec()
        .then(data=>{
            if(data == null)
            {
                //Insert
                let doctorobj=new Doctor()
                doctorobj.doctor_name=req.body.doctor_name
                if(req.file)
                {
                    doctorobj.profile=req.file.filename
                }
                doctorobj.qualification=req.body.qualification
                doctorobj.specialization=req.body.specialization
                doctorobj.experience=req.body.experience
                doctorobj.email=req.body.email
                doctorobj.password=bcrypt.hashSync(req.body.password,saltRounds)
                doctorobj.contact_number=req.body.contact_number
                doctorobj.address=req.body.address
                doctorobj.hospitalId=req.body.hospital_name
                doctorobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Doctor Added"
                })        
            }
            else{
                res.json({
                    'status':200,
                    'success':false,
                    'message':"doctor name already exists"
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
function viewalldoctor(req,res)
{
    Doctor.find(req.body).populate('hospitalId').exec()
    .then(doctorobj=>{
        res.json({
            "status":200,
            "success":true,
            "message":"Doctors Data Loaded",
            "data":doctorobj
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
function viewsingledoctor(req,res)
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
        Doctor.findOne({'_id':req.body._id}).populate('hospitalId').exec()
        .then(doctorobj=>{
            if(doctorobj!=null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Doctor Data Loaded",
                    "data":doctorobj
                })
            }
            else{
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Doctor Data Loaded",
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
function deletedoctor(req,res)
{
    console.log(req.body)
    if(req.body._id==null || req.body._id==undefined)
    {
        res.json({
            "status":422,
            "success":false,
            "message":"_id is required"
        })
    }
    else{
        Doctor.findOne({'_id':req.body._id}).exec()
        .then(doctorobj=>{
            if(doctorobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Doctor does not exist"
                })
            }
            else{
                doctorobj.isStatus=false
                doctorobj.isBlocked=true
                doctorobj.hospitalId = doctorobj.hospitalId
                doctorobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Doctor Deleted"
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
function updatedoctor(req,res)
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
        Doctor.findOne({'_id':req.body._id}).exec()
        .then(doctorobj=>{
            if(doctorobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Doctor does not exist"
                })
            }
            else{
                doctorobj.doctor_name=req.body.doctor_name
                if(req.file)
                {
                    doctorobj.profile=req.file.filename
                }
                doctorobj.qualification=req.body.qualification
                doctorobj.specialization=req.body.specialization
                doctorobj.experience=req.body.experience
                doctorobj.email=req.body.email
                doctorobj.password=bcrypt.hashSync(req.body.password,saltRounds)
                doctorobj.contact_number=req.body.contact_number
                doctorobj.address=req.body.address
                doctorobj.hospitalId=req.body.hospital_name
                doctorobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Doctor Data Updated",
                })
            }
        })
    }
}
module.exports={
    adddoctor,
    viewalldoctor,
    viewsingledoctor,
    deletedoctor,
    updatedoctor
}






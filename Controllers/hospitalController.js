const Hospital=require('../Models/hospitalModel')
const User=require('../Models/userModel')
const bcrypt=require('bcrypt')
const saltRounds=10
const jwt=require('jsonwebtoken')
const secretkey='nodeproject@abc'

function addhospital(req,res)
{
    console.log(req.body)
    var validations=''
    if(req.body.hospital_name=='' || req.body.hospital_name==undefined)
    {
        validations+='hospital_name is required\n'
    }
    if(req.body.specialization=='' || req.body.specialization==undefined)
    {
        validations+='specialization is required\n'
    }
    if(req.body.pincode=='' || req.body.pincode==undefined)
    {
        validations+='pincode is required\n'
    }
    if(req.body.address=='' || req.body.address==undefined)
    {
        validations+='address is required'
    }
    if(req.body.city_name=='' || req.body.city_name==undefined)
    {
        validations+='city_name is required\n'
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
        Hospital.findOne({'hospital_name':req.body.hospital_name}).exec()
        .then(data=>{
            if(data == null)
            {
                let hospitalobj=new Hospital()
                hospitalobj.hospital_name=req.body.hospital_name
                if(req.file)
                {
                    hospitalobj.image=req.file.filename
                }
                hospitalobj.specialization=req.body.specialization
                hospitalobj.pincode=req.body.pincode
                hospitalobj.address=req.body.address
                hospitalobj.cityId=req.body.city_name
                hospitalobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Hospital Added"
                })
            }
            else{
                res.json({
                    'status':200,
                    'success':false,
                    'message':'hospital name already exists'
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
function viewallhospital(req,res)
{
    Hospital.find(req.body).populate('cityId').exec()
    .then(hospitalobj=>{
        res.json({
            "status":200,
            "success":true,
            "message":"Hospital Data Loaded",
            "data":hospitalobj
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
function viewsinglehospital(req,res)
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
        Hospital.findOne({'_id':req.body._id}).populate('cityId').exec()
        .then(hospitalobj=>{
            if(hospitalobj!=null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Hospital Data Loaded",
                    "data":hospitalobj
                })
            }
            else{
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Hospital Data Loaded",
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
function tempdelhospital(req,res)
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
        Hospital.findOne({'_id':req.body._id}).exec()
        .then(hospitalobj=>{
            if(hospitalobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Hospital does not exist"
                })
            }
            else{
                hospitalobj.isStatus=false
                hospitalobj.isBlocked=true
                hospitalobj.cityId = hospitalobj.cityId
                
                hospitalobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Hospital Deleted"
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
function updatehospital(req,res)
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
        Hospital.findOne({'_id':req.body._id}).exec()
        .then(hospitalobj=>{
            if(hospitalobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Hospital does not exist"
                })
            }
            else{
                hospitalobj.cityId=req.body.city_name
                hospitalobj.hospital_name=req.body.hospital_name
                hospitalobj.pincode=req.body.pincode
                hospitalobj.address=req.body.address
                hospitalobj.specialization=req.body.specialization
                if(req.file)
                {
                    hospitalobj.image=req.file.filename
                }
                hospitalobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Hospital Data Updated",
                    "data":hospitalobj
                })
            }
        })
        .catch(err=>{
            res.json({
                "status":422,
                "success":false,
                "message":String(err)
            })
        })
    }
}
module.exports={
    addhospital,
    viewallhospital,
    viewsinglehospital,
    tempdelhospital,
    updatehospital
}





const City=require('../Models/cityModel')

function addcity(req,res)
{
    if(req.body.city_name=='' || req.body.city_name==undefined)
    {
        res.json({
            "status":422,
            "success":false,
            "message":"city_name is required"
        })
    }
    else{
        City.findOne({'city_name':req.body.city_name}).exec()
        .then( data=>{
            if(data == null)
            {
                //Insert
                let cityobj = new City()
                cityobj.city_name = req.body.city_name
                cityobj.save()
                res.json({
                    'status':200,
                    'success':true,
                    'message':'City Added'
                })
            }
            else{
                res.json({
                    'status':200,
                    'success':false,
                    'message':'city name already exists'
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
function viewallcity(req,res)
{
    City.find(req.body).exec()
    .then(cityobj=>{
        res.json({
            "status":200,
            "success":true,
            "message":"City Data Loaded",
            "data":cityobj
        })
    })
    .catch(err=>{
        res.json({
            "status":500,
            "success":false,
            "message":String(err)
        })
    }
    )
}
function viewsinglecity(req,res)
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
        City.findOne({'_id':req.body._id}).exec()
        .then(cityobj=>{
            if(cityobj!=null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"City Data Loaded",
                    "data":cityobj
                })
            }
            else{
                res.json({
                    "status":200,
                    "success":true,
                    "message":"City Data Loaded",
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
function tempdelcity(req,res)
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
        City.findOne({'_id':req.body._id}).exec()
        .then(cityobj=>{
            if(cityobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"City does not exist"
                })
            }
            else{
                cityobj.isStatus=false
                cityobj.isBlocked=true
                cityobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"City Deleted"
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
function updatecity(req,res)
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
        City.findOne({'_id':req.body._id}).exec()
        .then(cityobj=>{
            if(cityobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"City does not exist"
                })
            }
            else{
                cityobj.city_name=req.body.city_name
                cityobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"City Updated"
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
    addcity,
    viewallcity,
    viewsinglecity,
    tempdelcity,
    updatecity
}
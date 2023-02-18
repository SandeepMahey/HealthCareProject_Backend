const Medicalreport=require('../Models/medicalreportsModel')

function addmedicalreport(req,res)
{
    var validations=''
    if(req.body.test_name=='' || req.body.test_name==undefined)
    {
        validations+="test_name are required"
    }
    if(req.body.range=='' || req.body.range==undefined)
    {
        validations+="range are required"
    }
    if(req.body.result=='' || req.body.result==undefined)
    {
        validations+="result are required"
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
        let medicalobj=new Medicalreport()
        medicalobj.test_name=req.body.test_name
        medicalobj.range=req.body.range
        medicalobj.result=req.body.result
        medicalobj.patient_name=req.body.patient_name
        medicalobj.email=req.body.email
        medicalobj.save()
        res.json({
            "status":200,
            "success":true,
            "message":"Medical Reports Added"
        })
    }
}
function viewallmedicalreport(req,res)
{
    Medicalreport.find(req.body).exec()
    .then(medicalobj=>{

        res.json({
            "status":200,
            "success":true,
            "message":"Medical Reports Loaded",
            "data":medicalobj
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
function deletemedicalreport(req,res)
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
        Medicalreport.findOne({'_id':req.body._id}).exec()
        .then(medicalobj=>{
            if(medicalobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Medical Report does not exist"
                })
            }
            else{
                medicalobj.delete({'_id':req.body._id})
                .then(billobj=>{
                    res.json({
                        "status":200,
                        "success":true,
                        "message":"Medical Report Deleted"
                    })
                })
                .catch(err=>{
                    res.json({
                        "status":422,
                        "success":false,
                        "message":"Error While Deleting Medical Report"+err
                    })
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
    addmedicalreport,
    viewallmedicalreport,
    deletemedicalreport
}
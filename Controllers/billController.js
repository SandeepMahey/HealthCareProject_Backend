const Bill=require('../Models/billModel')

function addbill(req,res)
{
    var validations=''
    if(req.body.test_charges=='' || req.body.test_charges==undefined)
    {
        validations+="test_charges are required"
    }
    if(req.body.checkup_charges=='' || req.body.checkup_charges==undefined)
    {
        validations+="checkup_charges are required"
    }
    if(req.body.medical_charges=='' || req.body.medical_charges==undefined)
    {
        validations+="medicalreport_charges are required"
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
        var test_charges=req.body.test_charges
        var checkup_charges=req.body.checkup_charges
        var medical_charges=req.body.medical_charges
        var total_bill=parseInt(test_charges)+parseInt(checkup_charges)+parseInt(medical_charges)
        let billobj=new Bill()
        billobj.patient_name=req.body.patient_name
        billobj.test_charges=req.body.test_charges
        billobj.medical_charges=req.body.medical_charges
        billobj.checkup_charges=req.body.checkup_charges
        billobj.total_bill=total_bill
        billobj.email=req.body.email
        billobj.save()
        res.json({
            "status":200,
            "success":true,
            "message":"Bill Added"
        })
    }
}
function viewallbill(req,res)
{
    Bill.find(req.body).exec()
    .then(billobj=>{
        console.log(req.body)

        res.json({
            "status":200,
            "success":true,
            "message":"Bill Loaded",
            "data":billobj
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
function deletebill(req,res)
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
        Bill.findOne({'_id':req.body._id}).exec()
        .then(billobj=>{
            if(billobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Bill does not exist"
                })
            }
            else{
                billobj.delete({'_id':req.body._id})
                .then(billobj=>{
                    res.json({
                        "status":200,
                        "success":true,
                        "message":"Bill Deleted"
                    })
                })
                .catch(err=>{
                    res.json({
                        "status":422,
                        "success":false,
                        "message":"Error While Deleting bill"+err
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
    addbill,
    viewallbill,
    deletebill
}










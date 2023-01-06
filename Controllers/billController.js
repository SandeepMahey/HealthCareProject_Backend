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
    if(req.body.medicalreport_charges=='' || req.body.medicalreport_charges==undefined)
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
        var medicalreport_charges=req.body.medicalreport_charges
        var total_bill=test_charges+checkup_charges+medicalreport_charges
        console.log(total_bill)
        let billobj=new Bill()
        billobj.patientId=req.body.patientId
        billobj.test_charges=req.body.test_charges
        billobj.medicalreport_charges=req.body.medicalreport_charges
        billobj.checkup_charges=req.body.checkup_charges
        billobj.total_bill=total_bill
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
    Bill.find(req.body).populate('patientId').exec()
    .then(billobj=>{
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
module.exports={
    addbill,
    viewallbill
}










const Prescription=require('../Models/prescriptionModel')

function addprescription(req,res)
{
    var validations=''
    if(req.body.patient_name=='' || req.body.patient_name==undefined)
    {
        validations+="Patient Name is required\n"
    }if(req.body.age=='' || req.body.age==undefined)
    {
        validations+="Age is required\n"
    }if(req.body.gender=='' || req.body.gender==undefined)
    {
        validations+="Gender is required\n"
    }
    if(req.body.prescription=='' || req.body.prescription==undefined)
    {
        validations+="prescription is required\n"
    }
    if(req.body.doctor_name=='' || req.body.doctor_name==undefined)
    {
        validations+="Prescribed by is required\n"
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
        let prescriptionobj=new Prescription()
        prescriptionobj.prescription=req.body.prescription
        prescriptionobj.doctorId=req.body.doctor_name
        prescriptionobj.patient_name=req.body.patient_name
        prescriptionobj.age=req.body.age
        prescriptionobj.gender=req.body.gender
        prescriptionobj.save()
        res.json({
            "status":200,
            "success":true,
            "message":"Prescription Added"
        })
    }
}
function viewallprescription(req,res)
{
    Prescription.find(req.body).populate('doctorId').exec()
    .then(prescriptionobj=>{
        res.json({
            "status":200,
            "success":true,
            "message":"Prescription Loaded",
            "data":prescriptionobj
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

function deleteprescription(req,res)
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
        Prescription.findOne({'_id':req.body._id}).exec()
        .then(prescriptionobj=>{
            if(prescriptionobj==null)
            {
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Prescription does not exist"
                })
            }
            else{
                prescriptionobj.delete({'_id':req.body._id})
                .then(prescriptionobj=>{
                    res.json({
                        "status":200,
                        "success":true,
                        "message":"Prescription Deleted"
                    })
                })
                .catch(err=>{
                    res.json({
                        "status":422,
                        "success":false,
                        "message":"Error While Deleting prescription"+err
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
    addprescription,
    viewallprescription,
    deleteprescription
}
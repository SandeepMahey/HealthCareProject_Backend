const Appointment=require('../Models/appointmentModel')

function addappointment(req,res)
{
    var validations=''
    if(req.body.patientId=='' || req.body.patientId==undefined)
    {
        validations+="patientId is required"
    }
    if(req.body.doctorId=='' || req.body.doctorId==undefined)
    {
        validations+="doctorId is required"
    }
    if(req.body.hospitalId=='' || req.body.hospitalId==undefined)
    {
        validations+="hospital_id is required"
    }
    if(req.body.booking_date=='' || req.body.booking_date==undefined)
    {
        validations+="booking_date is required"
    }
    if(req.body.booking_time=='' || req.body.booking_time==undefined)
    {
        validations+="booking_time is required"
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
                //Insert
                var appointmentcount=Appointment.countDocuments.exec()
                let appointmentobj=new Appointment()
                appointmentobj.sno=appointmentcount+1
                appointmentobj.patientId=req.body.patientId
                appointmentobj.doctorId=req.body.doctorId
                appointmentobj.hospitalId=req.body.hospitalId
                appointmentobj.booking_date=req.body.booking_date
                appointmentobj.booking_time=req.body.booking_time
                appointmentobj.save()
                res.json({
                    "status":200,
                    "success":true,
                    "message":"Appointment Added",
                    "data":appointmentobj
                })
    }
}
function viewappointment(req,res)
{
    Appointment.find(req.body).exec()
    .then(data=>{
        res.json({
            "status":200,
            "success":true,
            "message":"Appointements Loaded",
            "data":data
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
    addappointment,
    viewappointment
}

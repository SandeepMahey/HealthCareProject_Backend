const Appointment=require('../Models/appointmentModel')

function addappointment(req,res)
{
    var validations=''
    if(req.body.email=='' || req.body.email==undefined)
    {
        validations+="email is required"
    }
   
    if(req.body.booking_date=='' || req.body.booking_date==undefined)
    {
        validations+="booking_date is required"
    }
    if(req.body.booking_time=='' || req.body.booking_time==undefined)
    {
        validations+="booking_time is required"
    }
    if(req.body.patient_name=='' || req.body.patient_name==undefined)
    {
        validations+="patient_name is required"
    }
    if(req.body.contact_number=='' || req.body.contact_number==undefined)
    {
        validations+="contact_number is required"
    }
    if(req.body.gender=='' || req.body.gender==undefined)
    {
        validations+="gender is required"
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
                let appointmentobj=new Appointment()
                appointmentobj.email=req.body.email
                appointmentobj.doctorId=req.body.doctor_name
                appointmentobj.specialization=req.body.specialization
                appointmentobj.booking_date=req.body.booking_date
                appointmentobj.booking_time=req.body.booking_time
                appointmentobj.booking_status=req.body.booking_status
                appointmentobj.patient_name=req.body.patient_name
                appointmentobj.contact_number=req.body.contact_number
                appointmentobj.gender=req.body.gender
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
    Appointment.find(req.body).populate('doctorId').exec()
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

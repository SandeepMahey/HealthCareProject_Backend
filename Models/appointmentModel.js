const mongo=require('mongoose')

const appointmentSchema=mongo.Schema({
    'email':{type:String,default:''},
    'doctorId':{type:mongo.Schema.Types.ObjectId,ref:'doctor',default:''},
    'specialization':{type:String,default:''},
    'booking_date':{type:String,default:''},
    'booking_time':{type:String,default:''},
    'booking_status':{type:String,default:'Pending'},
    'patient_name':{type:String,default:''},
    'contact_number':{type:Number,default:''},
    'gender':{type:String,default:''},    
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()},
})
module.exports=mongo.model('appointment',appointmentSchema)
const mongo=require('mongoose')

const appointmentSchema=mongo.Schema({
    'sno':{type:Number,default:1},
    'patientId':{type:mongo.Schema.Types.ObjectId,ref:'patient',default:''},
    'doctorId':{type:mongo.Schema.Types.ObjectId,ref:'doctor',default:''},
    'hospitalId':{type:mongo.Schema.Types.ObjectId,ref:'hospital',default:''},
    'booking_date':{type:String,default:''},
    'booking_time':{type:String,default:''},
    'booking_status':{type:String,default:'Pending'},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()},
})
module.exports=mongo.model('appointment',appointmentSchema)
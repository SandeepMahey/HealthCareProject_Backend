const mongo=require('mongoose')

const doctorSchema=mongo.Schema({
    'hospitalId':{type:mongo.Schema.Types.ObjectId,ref:'hospital',default:''},
    'doctor_name':{type:String,default:''},
    'profile':{type:String,default:'no-image.png'},
    'qualification':{type:String,default:''},
    'specialization':{type:String,default:''},
    'experience':{type:String,default:''},
    'email':{type:String,default:''},
    'password':{type:String,default:''},
    'contact_number':{type:Number,default:0},
    'address':{type:String,default:''},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()}
})
module.exports=mongo.model('doctor',doctorSchema)
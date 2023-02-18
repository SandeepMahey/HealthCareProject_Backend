const mongo=require('mongoose')

const patientSchema=mongo.Schema({
    'userId':{type:mongo.Schema.Types.ObjectId,ref:'user',default:''},
    'patient_name':{type:String,default:''},
    'dob':{type:String,default:''},
    'age':{type:String,default:0},
    'gender':{type:String,default:''},
    'email':{type:String,default:''},
    'password':{type:String,default:''},
    'contact_number':{type:String,default:''},
    'address':{type:String,default:''},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()},
})
module.exports=mongo.model('patient',patientSchema)
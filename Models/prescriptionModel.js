const mongo=require('mongoose')

const prescriptionSchema=mongo.Schema({
    'doctorId':{type:mongo.Schema.Types.ObjectId,ref:'doctor',default:''},
    'patient_name':{type:String,default:''},
    'age':{type:String,default:''},
    'gender':{type:String,default:''},
    'prescription':{type:String,default:''},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()}
})

module.exports=mongo.model('prescription',prescriptionSchema)
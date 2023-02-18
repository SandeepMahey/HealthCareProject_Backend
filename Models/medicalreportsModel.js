const mongo=require('mongoose')

const medicalreportSchema=mongo.Schema({
    'patient_name':{type:String,default:''},
    'email':{type:String,default:''},
    'test_name':{type:String,default:''},
    'range':{type:Number,default:0},
    'result':{type:String,default:''},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()}
})

module.exports=mongo.model('medicalreport',medicalreportSchema)
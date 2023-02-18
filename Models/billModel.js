const mongo=require('mongoose')

const billSchema=mongo.Schema({
    'patient_name':{type:String,default:''},
    'email':{type:String,default:''},
    'test_charges':{type:Number,default:0},
    'checkup_charges':{type:Number,default:0},
    'medical_charges':{type:Number,default:0},
    'total_bill':{type:Number,default:0},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()}
})
module.exports=mongo.model('bill',billSchema)
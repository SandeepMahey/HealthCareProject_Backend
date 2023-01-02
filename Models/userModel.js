const mongo=require('mongoose')

const userSchema=mongo.Schema({
    'email':{type:String,default:''},
    'password':{type:String,default:''},
    'userType':{type:Number,default:1},  //admin=0,patient=1,hospital:2
    'isStatus':{type:Boolean,default:true},
    'created_at':{type:Date,default:Date.now()}
})
module.exports=mongo.model('user',userSchema)
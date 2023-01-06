const mongo=require('mongoose')

const citySchema=mongo.Schema({
    'city_name':{type:String,default:''},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()}
})
module.exports=mongo.model('city',citySchema)
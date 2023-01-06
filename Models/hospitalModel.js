const mongo=require('mongoose')

const hospitalSchema=mongo.Schema({
    'cityId':{type:mongo.Schema.Types.ObjectId,ref:'city',default:''},
    'sno':{type:Number,default:1},
    'hospital_name':{type:String,default:''},
    'specialization':{type:String,default:''},
    'pincode':{type:Number,default:0},
    'address':{type:String,default:''},
    'image':{type:String,default:'no_image.png'},
    'isStatus':{type:Boolean,default:true},
    'isBlocked':{type:Boolean,default:false},
    'created_at':{type:Date,default:Date.now()}
})
module.exports=mongo.model('hospital',hospitalSchema)
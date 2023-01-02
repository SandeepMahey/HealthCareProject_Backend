const mongo=require('mongoose')
mongo.connect("mongodb://127.0.0.1:27017/HospitalProject")
.then(res=>{
    console.log("Database Connection Established")
})
.catch(err=>{
    console.log("Something Wrong!!")
})
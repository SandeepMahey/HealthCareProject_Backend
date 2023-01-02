const express=require('express')
const app=express()
const port=2000
const db=require('./Config/db')
const adminRoute=require('./Routes/adminRoutes')
const seeder=require('./Config/seeder')

app.use(express.urlencoded({extended:true}))

app.use('/admin',adminRoute)
seeder.insertuser()

app.listen(port,()=>{
    console.log("Server runs at port",port)
})
const express=require('express')
const app=express()
const port=2000
const db=require('./Config/db')
const adminRoute=require('./Routes/adminRoutes')
const patientRoute=require('./Routes/patientRoutes')
const hospitalRoute=require('./Routes/hospitalRoutes')
const seeder=require('./Config/seeder')

app.use(express.urlencoded({extended:true}))

app.use('/admin',adminRoute)
app.use('/patient',patientRoute)
app.use('/hospital',hospitalRoute)
seeder.insertuser()

app.listen(port,()=>{
    console.log("Server runs at port",port)
})
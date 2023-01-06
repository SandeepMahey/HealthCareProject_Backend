const Router=require('express').Router()
var usercontroller=require('../Controllers/userController')
var citycontroller=require('../Controllers/cityController')
var hospitalcontroller=require('../Controllers/hospitalController')
var doctorcontroller=require('../Controllers/doctorController')
var appointmentcontroller=require('../Controllers/appointmentController')

//admin routes start
Router.post('/login',usercontroller.login)
//admin routes end

//city routes start//
Router.post('/addcity',citycontroller.addcity)
Router.post('/viewallcity',citycontroller.viewallcity)
Router.post('/viewsinglecity',citycontroller.viewsinglecity)
Router.post('/tempdelcity',citycontroller.tempdelcity)
Router.post('/updatecity',citycontroller.updatecity)
//city routes end//

//hospital routes start//
const multer=require('multer')
const hospitalstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/hospital_logo')
    },
    filename: function (req, file, cb) {
        console.log(file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const new_name=uniqueSuffix+file.originalname
      cb(null, file.fieldname + '-' + new_name)
    }
  })
  
  const hospitalupload = multer({ storage: hospitalstorage })

Router.post('/addhospital',hospitalupload.single("image"),hospitalcontroller.addhospital)
Router.post('/viewallhospital',hospitalcontroller.viewallhospital)
Router.post('/viewsinglehospital',hospitalcontroller.viewsinglehospital)
Router.post('/deletehospital',hospitalcontroller.deletehospital)
Router.post('/updatehospital',hospitalupload.single("image"),hospitalcontroller.updatehospital)
//hospital routes end//

//doctor routes start//
const doctorstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/doctor_logo')
  },
  filename: function (req, file, cb) {
      console.log(file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const new_name=uniqueSuffix+file.originalname
    cb(null, file.fieldname + '-' + new_name)
  }
})

const doctorupload = multer({ storage: doctorstorage })

Router.post('/adddoctor',doctorupload.single("profile"),doctorcontroller.adddoctor)
Router.post('/viewalldoctor',doctorcontroller.viewalldoctor)
Router.post('/viewsingledoctor',doctorcontroller.viewsingledoctor)
Router.post('/deletedoctor',doctorupload.single("profile"),doctorcontroller.deletedoctor)
Router.post('/updatedoctor',doctorcontroller.updatedoctor)
//doctor routes end//

//Appointment Routes Start//
Router.post('/viewappointment',appointmentcontroller.viewappointment)
//Apointmnet Routes End//

module.exports=Router




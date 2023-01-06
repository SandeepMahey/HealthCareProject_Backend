const Router=require('express').Router()
var patientController=require('../Controllers/patientController')
var citycontroller=require('../Controllers/cityController')
var appointmentcontroller=require('../Controllers/appointmentController')

Router.post('/register',patientController.register)
Router.post('/login',patientController.login)
Router.post('/changepassword',patientController.changepassword)
Router.post('/resetpassword',patientController.resetpassword)
Router.post('/viewcity',citycontroller.viewallcity)

//Appointment Route Start//
Router.post('/addappointment',appointmentcontroller.addappointment)
Router.post('/viewappointment',appointmentcontroller.viewappointment)
//Appointmnet Routes end//
module.exports=Router
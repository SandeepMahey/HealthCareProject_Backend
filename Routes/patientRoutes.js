const Router=require('express').Router()
var patientController=require('../Controllers/patientController')
var citycontroller=require('../Controllers/cityController')
var appointmentcontroller=require('../Controllers/appointmentController')
var doctorcontroller=require('../Controllers/doctorController')
var hospitalcontroller=require('../Controllers/hospitalController')
var billcontroller=require('../Controllers/billController')
var medicalreportcontroller=require('../Controllers/medicalreportsController')
var prescriptioncontroller=require('../Controllers/prescriptionController')

Router.post('/register',patientController.register)
Router.post('/login',patientController.login)
Router.post('/viewalldoctor',doctorcontroller.viewalldoctor)
Router.post('/viewallhospital',hospitalcontroller.viewallhospital)
Router.post('/viewallpatient',patientController.viewallpatient)
Router.post('/addappointment',appointmentcontroller.addappointment)
Router.post('/viewsingledoctor',doctorcontroller.viewsingledoctor)

Router.use(require('../common/patientMiddleware'))
Router.post('/changepassword',patientController.changepassword)
Router.post('/resetpassword',patientController.resetpassword)
Router.post('/viewcity',citycontroller.viewallcity)
Router.post('/viewsinglepatient',patientController.viewsinglepatient)
Router.post('/viewallbill',billcontroller.viewallbill)
Router.post('/viewallmedicalreport',medicalreportcontroller.viewallmedicalreport)
Router.post('/viewallprescription',prescriptioncontroller.viewallprescription)

//Appointment Route Start//
Router.post('/viewappointment',appointmentcontroller.viewappointment)
//Appointmnet Routes end//

module.exports=Router
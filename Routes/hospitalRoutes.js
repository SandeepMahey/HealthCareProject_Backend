const Router=require('express').Router()
var usercontroller=require('../Controllers/userController')
var appointmentcontroller=require('../Controllers/appointmentController')
var billcontroller=require('../Controllers/billController')
var medicalreportcontroller=require('../Controllers/medicalreportsController')
var prescriptioncontroller=require('../Controllers/prescriptionController')
var hospitalcontroller=require('../Controllers/hospitalController')

Router.post('/login',usercontroller.login)

Router.post('/addbill',billcontroller.addbill)

Router.post(require('../common/hospitalMiddleware'))
//Appointment Routes start//
Router.post('/viewappointment',appointmentcontroller.viewappointment)
//Appointment Routes end//

//Bill Routes start//
Router.post('/viewallbill',billcontroller.viewallbill)
Router.post('/deletebill',billcontroller.deletebill)
//Bill Routes end//

//Medical Reports Routes start//
Router.post('/addmedicalreport',medicalreportcontroller.addmedicalreport)
Router.post('/viewallmedicalreport',medicalreportcontroller.viewallmedicalreport)
Router.post('/deletemedicalreport',medicalreportcontroller.deletemedicalreport)
//Medical Reports Routes End//

//Prescription Routes start//
Router.post('/addprescription',prescriptioncontroller.addprescription)
Router.post('/viewallprescription',prescriptioncontroller.viewallprescription)
Router.post('/deleteprescription',prescriptioncontroller.deleteprescription)
//Prescription Routes End//

module.exports=Router

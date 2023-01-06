const Router=require('express').Router()
var appointmentcontroller=require('../Controllers/appointmentController')
var billcontroller=require('../Controllers/billController')

//Appointment Routes start//
Router.post('/viewappointment',appointmentcontroller.viewappointment)
//Appointment Routes end//

//Bill Routes start//
Router.post('/addbill',billcontroller.addbill)
Router.post('/viewallbill',billcontroller.viewallbill)
//Bill Routes end//
module.exports=Router

const Router=require('express').Router()
var usercontroller=require('../Controllers/userController')
var citycontroller=require('../Controllers/cityController')
//admin routes start
Router.post('/login',usercontroller.login)
//admin routes end

//city routes start//
Router.post('/addcity',citycontroller.addcity)
Router.post('/viewcity',citycontroller.viewcity)
Router.post('/tempdelcity',citycontroller.tempdelcity)
Router.post('/updatecity',citycontroller.updatecity)
//city routes end//
module.exports=Router
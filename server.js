// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require("morgan")
const methodOverride = require("method-override")
const conntectToDB = require('./config/db')
const Doctor = require("./models/Doctor")
const Appointment = require("./models/Appointment")



// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride("_method")); // Changes the method based on the ?_method
app.use(morgan("dev")) // logs the requests as they are sent to our sever in the terminal




// connect to database

conntectToDB()









// Routes go here


// NEED a quick explanation on the create code: 
app.get("/doctors/new", (req, res)=> {
    
    res.render("/doctors/new.ejs")
})

app.post("/doctors/new", async(req,res)=> {
    console.log(req.body) 
    
    Doctor.create(req.body)
    res.redirect('/doctors/new')

})

// =================================

app.get("/doctors",  async (req, res)=>  {
    try{
        const allDoctors = await Doctor.find({})
        res.render("doctors/DoctorList.ejs", {allDoctors: allDoctors})
    }
    catch (error){
        console.log(error)
    }
})



app.get("/doctors/:doctorId", async (req,res)=>{
    try {
        const foundDocID = await Doctor.findById(res.params.doctorId)
        res.render("/doctors/DoctorsList.ejs", {doctor: foundDocID})
    }
    catch(error){
        console.log(error)
    }
})





app.get("/appointments/new", (req, res)=> {
    
    res.render("/appointments/new.ejs")
})

app.post("/appointments/new", async(req,res)=> {
    console.log(req.body) 
    
    Appointment.create(req.body)
    res.redirect('/appointments')

})



app.get("/appointments",  async (req, res)=>  {
    try{
        const allAppointments = await Appointment.find({})
        res.render("appointments/appointment-details.ejs", {allAppointments: allAppointments})
    }
    catch (error){
        console.log(error)
    }
})


app.get("/appointments/:appId", async (req,res)=>{
    const foundApp = await Appointment.findById(req.params.appId)
    res.render("/appointment/app-detail.ejs", {oneApp: foundApp})
})

// Delete: 
app.delete("/appointments/:appId", async (res, req)=> {
    try {
        const deletedApp = await Appointment.findByIdAndDelete(req.params.appId)
        res.redirect("/appointments")
    }
    catch(error) {
        console.log(error)
    }
})


// Update: 
app.get("/appointments/:appId/update", async (req,res)=> {
    try{
        const foundApp = await Appointment.findByIdAndUpdate(req.params.appId)
        res.render("/appointments/app-update.ejs", {foundApp})
     }
     catch(error){
        console.log(error)
     }
})


app.put("/appointments/:appId", async (req,res)=> {
    const updatedApp = await Appointment.findByIdAndUpdate(req.params.appId , req.body)
    res.redirect("/appointments")
})
















const port = process.env.PORT || 3000


app.listen(port,()=>{
    console.log("Listening on port " + port)
}) // Listen on port 3000






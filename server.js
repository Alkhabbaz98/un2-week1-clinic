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

app.set("view engine", "ejs")



// connect to database

conntectToDB()









// Routes go here


// Create Doctor:
app.get("/doctors/new", async (req, res) => {
    try {
        await res.render("doctors/new.ejs")
    }
    catch (error) {
        console.log(error)
    }

})

app.post("/doctors/new", async (req, res) => {
    console.log(req.body)

    await Doctor.create(req.body)
    res.redirect('/doctors/new')

})

// =================================
// Read 
app.get("/doctors", async (req, res) => {
    try {
        const allDoctors = await Doctor.find({})
        res.render("doctors/DoctorsList.ejs", { allDoctors: allDoctors })
    }
    catch (error) {
        console.log(error)
    }
})



app.get("/doctors/:doctorId", async (req, res) => {
    try {
        const foundDocID = await Doctor.findById(req.params.doctorId)
        res.render("doctors/Doctor-details.ejs", { foundDocID: foundDocID })
    }
    catch (error) {
        console.log(error)
    }
})

// Delete doctor
app.delete("/doctors/:doctorId", async (req, res) => {
    try {
        const deletedDoc = await Doctor.findByIdAndDelete(req.params.doctorId)
        res.redirect("/doctors")
    }
    catch (error) {
        console.log(error)
    }
})


// Update Doctor:
app.get("/doctors/:doctorId/update", async (req, res) => {
    try {
        const updateDoc = await Doctor.findById(req.params.doctorId)
        res.render("doctors/updateDoc.ejs", { updateDoc: updateDoc })
    }
    catch (error) {
        console.log(error)
    }
})

app.put("/doctors/:doctorId", async (req, res) => {
    const updatedDoc = await Doctor.findByIdAndUpdate(req.params.doctorId, req.body);
    res.redirect("/doctors");
})






// For Appointments: 

// Create:
app.get("/appointments/new", async (req, res) => {
    try {
        const allDoctors = await Doctor.find({})
        res.render("appointments/new.ejs", {allDoctors: allDoctors})
    } 
    catch(error) {
        console.log(error)
    }
})

app.post("/appointments/new", async (req, res) => {
    console.log(req.body)

    await Appointment.create(req.body)
    res.redirect('/appointments')

})


// Read:

app.get("/appointments", async (req, res) => {
    try {
        const allAppointments = await Appointment.find({})
        res.render("appointments/app-list.ejs", { allAppointments: allAppointments })
    }
    catch (error) {
        console.log(error)
    }
})


app.get("/appointments/:appId", async (req, res) => {
    const foundApp = await Appointment.findById(req.params.appId).populate('doctor')
    res.render("appointments/app-details.ejs", { foundApp: foundApp })
})



// Delete: 
app.delete("/appointments/:appId", async (req, res) => {
    try {
        const deletedApp = await Appointment.findByIdAndDelete(req.params.appId)
        res.redirect("/appointments")
    }
    catch (error) {
        console.log(error)
    }
})


// Update: 
app.get("/appointments/:appId/update", async (req, res) => {
    try {
        const updateApp = await Appointment.findByIdAndUpdate(req.params.appId)
        res.render("appointments/app-update.ejs", { updateApp: updateApp })
    }
    catch (error) {
        console.log(error)
    }
})


app.put("/appointments/:appId", async (req, res) => {
    const updatedApp = await Appointment.findByIdAndUpdate(req.params.appId, req.body)
    res.redirect("/appointments")
})
















const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log("Listening on port " + port)
}) // Listen on port 3000






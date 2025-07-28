const {model, Schema} = require("mongoose")

const appointmentSchema = new Schema ({
    patientName: {
        type: String,
        required: true,
    }, 
    date: {
        type: Date,
        required: true,
    },

    reason: {
        type: String, 
        required: true,
    },

    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    }
})

const Appointment = model("Appointment", appointmentSchema)

module.exports = Appointment
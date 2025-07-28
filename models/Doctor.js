const {model, Schema} = require("mongoose")

const doctorSchema = new Schema ({
    name: {
        type: String,
        required: true,
    }, 
    specialty: {
        type: String,
        required: true,
    },

    yearsOfExpreience: {
        type: Number, 
        required: true,
    }
})

const Doctor = model("Doctor", doctorSchema)

module.exports = Doctor
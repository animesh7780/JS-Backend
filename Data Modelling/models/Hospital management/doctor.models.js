import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    salary: {
        typr: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    experiance: {
        type: Number,
        default: 0
    },
    worksFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospital'
    }]
}, { timestamps: true })

export const Doctor = mongoose.model('Doctor', doctorSchema)
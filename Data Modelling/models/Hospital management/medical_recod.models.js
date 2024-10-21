import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema)
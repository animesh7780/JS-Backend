import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subtodos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subTodo'
    }]//array of subTodos
}, { timestamps: true })

export const User = mongoose.model('todo', todoSchema)
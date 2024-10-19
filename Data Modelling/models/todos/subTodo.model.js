import mongoose from "mongoose";

const subTodoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    todoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }
}, { timestamps: true })

export const SubTodo = mongoose.model('subTodo', subTodoSchema)
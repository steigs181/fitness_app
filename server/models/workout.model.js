const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [20, "Name can only be 20 characters long"]
    },
    equipment: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [20, "Equipment can only be 20 characters long"]
    },
    exercise_type: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [20, "exercise type can only be 20 characters long"]
    },
    force_type: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [20, "Force Type can only be 20 characters long"]
    },
    mechanics: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [20, "Mechanics can only be 20 characters long"]
    },
    primary_muscles: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [100, "Primary Muscles can only be 100 characters long"]
    },
    secondary_muscles: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [100, "Secondary Muscles can only be 100 characters long"]
    },
    comments: {
        type: String, 
        required: true,
        minLength: [2, "Must be at least 2 characters long"],
        maxLength: [200, "Comments Can only be 200 characters long"]
    },
}, {timestamps: true})

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
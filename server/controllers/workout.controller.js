const Workout = require("../models/workout.model")

module.exports = {
    allWorkouts: (req, res) => {
        Workout.find({})
        .then((workout)=> {
            res.json(workout)
        })
        .catch( err => {
            res.json({ message: "Something went wrong in the get all controllers", error: err})
        })
    },
    getOneWorkout: (req, res) => {
        Workout.findOne({ _id: req.params.id})
            .then(oneWorkout => {
                res.status(200).json({workout: oneWorkout})
            })
            .catch( err => {
                res.status(500).json({ message: "Something went wrong in get one controllers", error: err})
            })
    },

    //CREATE
    newWorkout: (req, res) => {
        Workout.create(req.body)
            .then( newWorkout => {
                res.status(200).json({ workout: newWorkout})
            })
            .catch( err => {
                res.status(500).json({ message: "Something went wrong in create controllers", error: err})
            })
    },

    //UPDATE
    updateWorkout: (req, res) => {
        Workout.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true, runValidators: true, })
            .then( updateWorkout => {
                res.status(200).json({ workout: updateWorkout})
            })
            .catch( err => {
                res.status(500).json({ message: "Something went wrong in update controllers", error: err})
            })
    },

    //DELETE
    deleteWorkout: (req, res) => {
        Workout.deleteOne({ _id: req.params.id})
            .then( deleted => {
                res.status(200).json(deleted)
            })
            .catch( err => {
                res.status(500).json({ message: "Something went wrong in delete controllers", error: err})
            })
    }
}
const WorkoutController = require("../controllers/workout.controller");

module.exports = (app) => {
    app.get("/api/getWorkouts", WorkoutController.allWorkouts)
    app.get("/api/getOneWorkout/:id", WorkoutController.getOneWorkout)
    app.post("/api/createWorkout", WorkoutController.newWorkout)
    app.patch("/api/updateWorkout/:id", WorkoutController.updateWorkout)
    app.delete("/api/deleteWorkout/:id", WorkoutController.deleteWorkout)
}
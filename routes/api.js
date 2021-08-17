const db = require("../models");
const router = require("express").Router();


// GET all the workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        dbWorkout.forEach(workout => {
            let total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res,json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

// PUT route to add an exercise
router.put("/api/workouts:id", (req, res) => {
    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

// POST route to create a workout
router.post("/api/workouts", ({ body }, res) => {
    dbWorkout.create(body).then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

// GET all workouts within range
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        console.log("All Workouts");
        console.log(dbWorkout);

        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const courseSchema = require("../models/course");

router.get('/validation/validation', (req, res) => {
    res.render('validation/validation');
});


router.post("/submit_all_semesters", async (req, res) => {
        const firstSemesterCourses = req.body.firstSemester_courseName;
        const firstSemesterCreditHours = req.body.firstSemester_creditHours;
        const secondSemesterCourses = req.body.secondSemester_courseName;
        const secondSemesterCreditHours = req.body.secondSemester_creditHours;
        const interSemesterCourses = req.body.interSemester_courseName;
        const interSemesterCreditHours = req.body.interSemester_creditHours;
    try{
        // Inserting first semester courses
        const firstSemesterData = firstSemesterCourses.map((course, index) => ({
            courseName: course,
            creditHours: parseInt(firstSemesterCreditHours[index]),
        }));
        await courseSchema.insertMany(firstSemesterData);

        // Inserting second semester courses
        const secondSemesterData = secondSemesterCourses.map((course, index) => ({
            courseName: course,
            creditHours: parseInt(secondSemesterCreditHours[index]),
        }));
        await courseSchema.insertMany(secondSemesterData);

        // Inserting inter-semester courses
        const interSemesterData = interSemesterCourses.map((course, index) => ({
            courseName: course,
            creditHours: parseInt(interSemesterCreditHours[index]),
        }));
        await courseSchema.insertMany(interSemesterData);

        res.redirect('/validation/validation');
    }catch(e){
        console.error('Error:', e);
        res.status(500).send('Error saving data to MongoDB using Mongoose');
    }
});


module.exports = router;
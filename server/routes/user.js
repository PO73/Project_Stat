const express = require('express');
const userExpressRouter = express.Router();

userExpressRouter.get('/studentdashboard', (req, res) =>{ //Load the student dashboard
    res.render('./Student_Pages/studentDashboard');
});

userExpressRouter.get('/teacherdashboard', (req, res) =>{ //Load the teacher dashboard
    res.render('./Teacher_Pages/teacherDashboard');
});

userExpressRouter.get('/admindashboard', (req, res) =>{ //Load the admin dashboard
    res.render('./Admin_Pages/adminDashboard');
});

module.exports = userExpressRouter;
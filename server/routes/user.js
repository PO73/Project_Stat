const express = require('express');
const userExpressRouter = express.Router();

const permissions = require("../scripts/authentication/userPermissions");

userExpressRouter.get('/studentdashboard', permissions.isUserAlreadyLogedIn, permissions.isUserStudent, (req, res) => { //Load the student dashboard
    res.render('./Student_Pages/studentDashboard');
});

userExpressRouter.get('/teacherdashboard', permissions.isUserAlreadyLogedIn, permissions.isUserTeacher, (req, res) => { //Load the teacher dashboard
    res.render('./Teacher_Pages/teacherDashboard');
});

userExpressRouter.get('/admindashboard', permissions.isUserAlreadyLogedIn, permissions.isUserAdmin, (req, res) => { //Load the admin dashboard
    res.render('./Admin_Pages/adminDashboard');
});

module.exports = userExpressRouter;
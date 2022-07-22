require('express-group-routes');
const express = require('express');
const router = express.Router();
const AttendController = require("../controllers/attend.controller.js");
const AttendValidator = require('../middlewares/validators/attend.validator.js');
const VerifyToken = require('../middlewares/auth/jwt.auth.js');

const multer = require('multer');
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
			cb(null, './public/images')
	},
	filename: function (req, file, cb) {
			cb(null, Date.now() + file.originalname)
	}
})
var upload = multer({ storage: storage});

router.use(VerifyToken)
router.post("/report", AttendValidator.validateReport, AttendController.report);
router.get("/", AttendValidator.validateMonthlyAttendance, AttendController.findOne);
router.post("/", [upload.single('selfie'), AttendValidator.validateAttendance], AttendController.create);
router.put("/", [upload.single('selfie'), AttendValidator.validateAttendanceUpdate], AttendController.update);

module.exports = router;
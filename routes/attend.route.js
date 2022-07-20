require('express-group-routes');
const express = require('express');
const router = express.Router();
const AttendController = require("../controllers/attend.controller.js");
const AttendValidator = require('../middlewares/validators/attend.validator.js');
const VerifyToken = require('../middlewares/auth/jwt.auth.js');

router.use(VerifyToken)
router.get("/", AttendValidator.validateSessionAdmin, AttendController.info);

module.exports = router;
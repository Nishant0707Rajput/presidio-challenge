const router = require('express').Router();
const controller = require('../../../controller/auth');
const {validate} = require("../../../middleware");
const schema = require("../../../validation/user");

router.post(`/sign-up`,validate(schema.userDetail) ,controller.registerUser);
router.post(`/login`,validate(schema.loginDetail) ,controller.login);


module.exports = router;
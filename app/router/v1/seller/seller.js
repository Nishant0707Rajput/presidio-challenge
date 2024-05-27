const router = require('express').Router();
const controller = require('../../../controller/property');
const {validate, verifyBuyerAuthToken} = require("../../../middleware");
const schema = require("../../../validation/user");


router.get(`/:id`,verifyBuyerAuthToken, controller.getSellerDetails);

module.exports = router;
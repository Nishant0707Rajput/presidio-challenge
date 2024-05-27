const router = require('express').Router();
const controller = require('../../../controller/property');
const {validate, verifySellerAuthToken} = require("../../../middleware");
const schema = require("../../../validation/user");


router.post(`/`,verifySellerAuthToken, controller.createProperty);
router.put(`/:id`,verifySellerAuthToken,controller.updateProperty);
router.get(`/:id`,controller.getPropertyById);
router.delete(`/:id`,verifySellerAuthToken,controller.deleteProperty);
router.get(`/`,controller.getAllProperties);

module.exports = router;
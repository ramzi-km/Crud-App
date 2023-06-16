const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

router.post('/login',adminController.postAdminLogin)

module.exports = router;

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

router.post('/login', adminController.postAdminLogin);
router.post('/logout', adminController.postAdminLogout);
router.get('/users', adminController.getUsers);
router.delete('/deleteUser/:id', adminController.deleteUser);

module.exports = router;

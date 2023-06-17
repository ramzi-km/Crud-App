const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

router.post('/login', adminController.postAdminLogin);
router.post('/logout', adminController.postAdminLogout);
router.get('/users', adminController.getUsers);
router.delete('/deleteUser/:id', adminController.deleteUser);
router.post('/createUser', adminController.createUser);
router.put('/updateUser/:id', adminController.updateUser);

module.exports = router;

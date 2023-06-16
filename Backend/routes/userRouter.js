const express = require('express');
const {
  postSignup,
  postLogin,
  postLogout,
  getUser,
  editProfile,
} = require('../controllers/userControllers');
const multiUpload = require('../middlewares/multer');
const router = express.Router();

router.post('/signUp', postSignup);
router.post('/login', postLogin);
router.get('/user', getUser);
router.post('/logout', postLogout);
router.post('/editProfile', multiUpload, editProfile);

module.exports = router;

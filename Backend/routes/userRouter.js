const express = require('express');
const {
  postSignup,
  postLogin,
  postLogout,
  getUser,
} = require('../controllers/userControllers');
const router = express.Router();

router.post('/signUp', postSignup);
router.post('/login', postLogin);
router.get('/user', getUser);
router.post('/logout', postLogout);

module.exports = router;

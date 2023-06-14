const express = require('express');
const {
  postSignup,
  postLogin,
  getHome,
  postLogout,
} = require('../controllers/userControllers');
const router = express.Router();

router.post('/signUp', postSignup);
router.post('/login', postLogin);
router.get('/home', getHome);
router.post('/logout', postLogout);

module.exports = router;

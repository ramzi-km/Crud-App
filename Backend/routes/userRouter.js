const express = require('express');
const {
  postSignup,
  postLogin,
  getHome,
} = require('../controllers/userControllers');
const router = express.Router();

router.post('/signUp', postSignup);
router.post('/login', postLogin);
router.get('/home', getHome);

module.exports = router;

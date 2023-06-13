const mongoose = require('mongoose');
const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  postSignup: async (req, res) => {
    try {
      let { name, email, password } = { ...req.body };
      password = await bcrypt.hash(password, 10);
      const findUser = await userModel.findOne({ email: email });
      if (findUser) {
        res.json({ message: 'User Already Exists' });
      } else {
        const user = new userModel({ name, email, password });
        let result = await user.save();
        let data = { id: result.id, name: result.name, email: result.email };
        res.send(data);
      }
    } catch (err) {
      res.send(err);
    }
  },
  postLogin: async (req, res) => {
    try {
      const { email, password } = { ...req.body };
      const user = await userModel.findOne({ email: email });
      if (user) {
        const comparison = await bcrypt.compare(password, user.password);
        if (comparison) {
          const secret = process.env.SECRET_KEY;
          const token = jwt.sign({ _id: user._id }, secret);
          res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
          return res.send({
            message: 'success',
          });
        } else {
          res.status(400).send({ message: 'Incorrect Password' });
        }
      } else {
        res.status(404).send({ message: 'user not found' });
      }
    } catch (err) {
      console.log('Error :', err);
    }
  },
  getHome: async (req, res) => {
    const cookie = req.cookies['jwt'];
    const secret = process.env.SECRET_KEY;
    const claims = jwt.verify(cookie, secret);
    if (!claims) {
      res.status(401).send({ message: 'unauthenticated' });
    } else {
      const user = await userModel.findOne({
        _id: claims._id,
      });
      const { password, ...data } = await user.toJSON();
      res.send(data);
    }
  },
};

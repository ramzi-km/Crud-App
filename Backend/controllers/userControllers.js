const mongoose = require('mongoose');
const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  postSignup: async (req, res) => {
    try {
      let { name, email, password } = { ...req.body };
      if (!email || !password || !name) {
        return res
          .status(401)
          .send({ message: 'provide necessary information' });
      }
      password = await bcrypt.hash(password, 10);
      const findUser = await userModel.findOne({ email: email });
      if (findUser) {
        return res.status(403).json({ message: 'User Already Exists' });
      } else {
        const user = new userModel({ name, email, password });
        await user.save();
        const result = await userModel.findOne({
          email: user.email,
        });

        let data = { name: result.name, email: result.email };
        return res.json(data);
      }
    } catch (err) {
      res.send(err);
    }
  },
  postLogin: async (req, res) => {
    try {
      const { email, password } = { ...req.body };
      if (!email || !password) {
        return res
          .status(401)
          .json({ message: 'provide necessary information' });
      }
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
          const { password, ...data } = await user.toJSON();
          return res.json(data);
        } else {
          res.status(400).json({ message: 'Incorrect Password' });
        }
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    } catch (err) {
      console.log('Error :', err);
    }
  },
  getUser: async (req, res) => {
    try {
      const cookie = req.cookies['jwt'];
      if (cookie) {
        const secret = process.env.SECRET_KEY;
        const claims = jwt.verify(cookie, secret);
        if (!claims) {
          res.status(401).send({ message: 'unauthenticated' });
        } else {
          const user = await userModel.findOne({
            _id: claims._id,
          });
          const { password, ...data } = await user.toJSON();
          res.json(data);
        }
      } else {
        res.status(401).send({ message: 'unauthenticated' });
      }
    } catch (error) {
      res.send({ message: error.message });
    }
  },
  postLogout: (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });
    res.send({ message: 'success' });
  },
  editProfile: async (req, res) => {
    try {
      const cookie = req.cookies['jwt'];
      if (cookie) {
        const secret = process.env.SECRET_KEY;
        const claims = jwt.verify(cookie, secret);
        if (!claims) {
          res.status(401).send({ message: 'unauthenticated' });
        } else {
          const name = req.body.name;
          const image = req.files?.profilePic?.[0];
          const email = req.body.email;
          let updateFields = {};
          name ? (updateFields.name = name) : '';
          image ? (updateFields.profilePic = image) : '';
          await userModel.updateOne(
            { _id: claims._id },
            { $set: { ...updateFields } }
          );
          const user = await userModel.findOne({
            _id: claims._id,
          });
          const { password, ...data } = await user.toJSON();
          res.json(data);
        }
      } else {
        res.status(401).send({ message: 'unauthenticated' });
      }
    } catch (e) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};

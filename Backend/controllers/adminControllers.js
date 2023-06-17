const adminModel = require('../models/adminModel');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  postAdminLogin: async (req, res) => {
    try {
      const { email, password } = { ...req.body };
      if (!email || !password) {
        return res
          .status(401)
          .json({ message: 'provide necessary information' });
      }
      const admin = await adminModel.findOne({ email: email });
      if (admin) {
        const comparison = await bcrypt.compare(password, admin.password);
        if (comparison) {
          const secret = process.env.SECRET_KEY2;
          const token = jwt.sign({ _id: admin._id }, secret);
          res.cookie('adminJwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          });
          const { password, ...data } = await admin.toJSON();
          return res.json(data);
        } else {
          res.status(400).json({ message: 'Incorrect Password' });
        }
      } else {
        res.status(404).json({ message: 'admin not found' });
      }
    } catch (err) {
      res.status(500).send({ message: 'internal server error', error: err });
    }
  },
  postAdminLogout: (req, res) => {
    res.cookie('adminJwt', '', { maxAge: 0 });
    res.send({ message: 'success' });
  },
  getUsers: async (req, res) => {
    try {
      const cookie = req.cookies['adminJwt'];
      if (cookie) {
        const secret = process.env.SECRET_KEY2;
        const claims = jwt.verify(cookie, secret);
        if (!claims) {
          res.status(401).send({ message: 'unauthenticated' });
        } else {
          const users = await userModel.find().lean();
          return res.json(users);
        }
      } else {
        res.status(401).send({ message: 'unauthenticated' });
      }
    } catch (error) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const cookie = req.cookies['adminJwt'];
      if (cookie) {
        const secret = process.env.SECRET_KEY2;
        const claims = jwt.verify(cookie, secret);
        if (!claims) {
          res.status(401).send({ message: 'unauthenticated' });
        } else {
          let userId = req.params.id;
          await userModel.deleteOne({ _id: userId });
          return res.json({ message: 'success' })
        }
      } else {
        res.status(401).send({ message: 'unauthenticated' });
      }
    } catch (error) {
      res.status(500).send({ message: 'internal server error' });
    }
  },
};

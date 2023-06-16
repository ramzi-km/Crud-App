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
};

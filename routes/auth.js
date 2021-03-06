const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const { registerValidation, loginValidation } = require('../helper/validation');
const signToken = require('../middleware/signToken');

router.post('/register', async (req, res) => {
  // LETS VALIDATE THE DATE BEFORE CREATING A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists in the database
  const emailExist = await userModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exists');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new user
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/login', (req, res) => {
  // LETS VALIDATE THE DATA BEFORE CREATING A USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email already exists in the database
  userModel.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(400).json({ error: "Email doesn't exists" });
    }

    console.dir(user._id);

    // Check if password is valid
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      console.log(isMatch);
      if (isMatch) {
        console.log('Password matched');

        signToken({ _id: user._id, ip: req.ip })
          .then(token => {
            res.status(200).json(token);
          })
          .catch(error => {
            console.log(error);
            return res.status(500).json({ error: 'Error signing token', raw: error.message });
          });
      } else {
        console.log('Password mismatch');
        return res.status(400).json({ error: 'Invalid password' });
      }
    });
  });
});

module.exports = router;

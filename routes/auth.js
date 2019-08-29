const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const { registerValidation, loginValidation } = require('../helper/validation');

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

router.post('/login', async (req, res) => {
  // LETS VALIDATE THE DATA BEFORE CREATING A USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if email already exists in the database
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exists");

  // Check if password is valid
  console.dir(user._id);
  const validPass = bcrypt.compareSync(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  /**
   * Create and assign a token
   * expiresIn: seconds
   */
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 1 });
  res
    .header('auth-token', token)
    .status(200)
    .send(token);
});

module.exports = router;

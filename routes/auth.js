const router = require('express').Router();
const userModel = require('../model/user');

router.post('/register', async (req, res) => {
    const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const saveduser = await user.save();
        res.send(saveduser);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
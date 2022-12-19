require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MissionControler = require('../controlers/MissionControler');

app.get('/', (req, res) => {
    res.send('hello')
});

app.use(express.json());

//modules
const User = require('../models/User');
const Missions = require('../models/MissionsModel');
//midleware
const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]//separate bearer

    if (!token) {
        return res.status(401).json({ msg: 'not have a user Token' })
    }

    try {

        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();

    } catch (error) {
        res.status(400).json({ msg: 'invalided token' })
    }
}

// private Route
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    // check if user exist
    const user = await User.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: 'User not found' })
    }
    res.status(202).json({ user });

})

//login
app.post('/auth/user', async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ msg: 'require email' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'require password' })
    }

    //check if User exist;
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ msg: 'not exist this User' })
    }

    //check password is true
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(404).json({ msg: 'invalidate password' })
    }

    try {

        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({ msg: "auth is Sucessfull!!", token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error in try' })
    }
})

//mission Routes
app.post('/missions', MissionControler.store);
app.get('/missions', MissionControler.index);
app.get('/missions/:id', MissionControler.show);
app.put('/missions/:id', MissionControler.update);
app.delete('/missions/:id', MissionControler.destroy);

//Register
app.post('/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body;

    //validation
    if (!name) {
        return res.status(422).json({ msg: 'require name' })
    }
    if (!email) {
        return res.status(422).json({ msg: 'require email' })
    }
    if (!password) {
        return res.status(422).json({ msg: 'require password' })
    }
    if (!confirmpassword) {
        return res.status(422).json({ msg: 'require confirmpassword' })
    }

    //check if user exist
    const userExist = await User.findOne({ email: email });

    if (userExist) {
        return res.status(422).json({ msg: 'Exist this email in database, try other email' })
    }

    //create password cript
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create User
    const user = new User({
        name,
        email,
        password: passwordHash,
    });

    try {
        await user.save();
        res.status(201).json({ msg: 'sucess' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error in try' })
    }
})

const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.c2ouij4.mongodb.net/?retryWrites=true&w=majority`).then(() => {
    app.listen(3000, () => { console.log('escutando na porta 3000') })
}).catch((err) => console.log(err))

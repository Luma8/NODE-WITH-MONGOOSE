require('dotenv').config();
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserControler {
    //Register User
    async register(req, res) {
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
        const userExist = await UserModel.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ msg: 'Exist this email in database, try other email' })
        }

        //create password cript
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //create User
        const user = new UserModel({
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
    }
    //Login User
    async login(req, res) {
        const { email, password } = req.body;

        if (!email) {
            return res.status(422).json({ msg: 'require email' })
        }
        if (!password) {
            return res.status(422).json({ msg: 'require password' })
        }

        //check if User exist;
        const user = await UserModel.findOne({ email: email })
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
    }
    async showuser(req, res) {
        try {
            const id = req.params.id;

            // check if user exist
            const user = await UserModel.findById(id, '-password')

            if (!user) {
                return res.status(404).json({ msg: 'User not found' })
            }
            res.status(202).json({ user });
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = new UserControler();
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

module.exports = {

    login: async(req, res) => {

        const user = await User.findOne({ email: req.body.email })
        if (user === null) {
            console.log("User not found")
            return res.sendStatus(400)
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword) {
            console.log("Incorrect password")
            return res.sendStatus(400)
        }
        const userToken = jwt.sign({
            id: user._id
        }, secretKey);
        
        res
            .cookie("userToken", userToken, { httpOnly: true})
            .json({msg: "Successfully logged in!"});
    },

    register: (req, res) => {
        User.create( req.body )
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, secretKey);
                console.log("Success in creating user")
                res
                    .cookie("usertoken", userToken, {httpOnly: true})
                    .json({message: "Success", user: user});
            })
            .catch( err => {
                console.log("Error creating user", err)
                res.status(400).json(err)});
    },

    logout: (req, res) => {
        console.log("Successfully logged out!")
        res.clearCookie("usertoken");
        res.sendStatus(200);
    },

    findUser: async (req, res) => {
        try {
            const userToken = req.cookies.userToken;

            if (!userToken) {
                return res.status(401).json({ message: "user is not found" });
            }

            const decoded = jwt.verify(userToken, secretKey);
            const userId = decoded.id;

            const user = await User.findById(userId).exec();

            if (!user) {
                return res.status(404).json({ message: "user not found" });
            }

            res.json(user);
            } catch (error) {
                return res.status(401).json({ message: "invalid token" });
            }
    },

    updateUser: (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true, runValidators: true, })
            .then( updateUser => {
                res.status(200).json({ user: updateUser})
            })
            .catch( err => {
                res.status(500).json({ message: "Something went wrong in update controllers", error: err})
            })
    }

}
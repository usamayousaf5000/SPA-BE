const User = require('../model/UserSchema');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                message: 'Please enter all fields'
            })
        }
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: 'User does not exist'
            })
        }
        const token = jwt.sign({ id: existingUser._id }, 'Usama', { expiresIn: '1h' });
        res.status(200).json({
          message: 'Login successful',
          token: token
        });
    }
    catch (err) {
        res.status(500).send('Server error');
    }
}

exports.Signup= async (req, res) => {
    try{
        const {name,email,password} = req.body;
        if (!name || !email || !password) {
            res.status(404).json({
                message: 'Please enter all fields'
            })
        }
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(404).json({
                message: 'User already exists'
            })
        }
        existingUser = new User({
            name,
            email,
            password,
        });
        await existingUser.save();
        res.status(200).json({
            message: 'User created successfully'
        });
    }
    catch(err){
        res.send('error');
        res.status(500).send('Server error');
    }

};
exports.Logout = async (req, res) => {
    try {
        res.clearCookie('token');

        req.session = null; 
        res.status(200).json({
            message: 'Logged out successfully',
            redirect: '/login' 
        });
    } catch (err) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

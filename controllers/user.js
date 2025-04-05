const Post = require('../model/PostSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const secret = 'Usama';
exports.CreatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(404).json({
                message: 'Please enter all fields'
            })
        }
        let Post = new ({
            title,
            content,
        });
        await Post.save();
        res.status(200).json({
            message: 'Post created successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};
exports.GetPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};
exports.UpdatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(404).json({
                message: 'Please enter all fields'
            })
        }
        const post = await Post.findOneAndUpdate({ _id: req.params.id }, {
            title,
            content,
        });
        res.status(200).json({
            message: 'Post updated successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};
exports.DeletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: 'Post deleted successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Internal Server Error'
        })
    }
};
exports.CheckGrammer = async (req, res) =>{

}
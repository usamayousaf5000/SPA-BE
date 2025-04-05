const express = require('express')
const router = require('express').Router()
const app = express()

const authRoutes = require('../controllers/auth')

router.post('/login', authRoutes.login);
router.post('/signup', authRoutes.Signup);

module.exports = router;
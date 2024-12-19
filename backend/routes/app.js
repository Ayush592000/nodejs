const express = require('express')
const { signup, getSignUp } = require('../controller/app')
const router = express.Router()

router.post('/user/signup', signup)
router.post('/real/gmail-account', getSignUp)

module.exports = router
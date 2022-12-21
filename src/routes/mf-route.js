const express = require('express')
const router = express.Router()

const controller = require('../controllers/mf-controller')

router.get('/', controller.get)

module.exports = router
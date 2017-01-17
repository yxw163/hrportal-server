'use strict'

const router = require('express').Router()
const messageList = require('./getMessageList')

router.get('/1', messageList.getMessageList)

module.exports = router
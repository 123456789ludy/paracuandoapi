const express = require('express')
const router = express.Router()

const controller = require('../controllers/users.controller')

router.get('/', controller.getUsers)
router.post('/', controller.addUser)
router.get('/:id', controller.getUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.removeUser)

module.exports = router
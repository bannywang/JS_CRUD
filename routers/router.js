const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/ctrl')

// get routes --------------------------------
router.get('/', ctrl.index_page)
router.get('/user_list', ctrl.user_list_page)

// post routes --------------------------------

// put routes --------------------------------
router.put('/updateUser/:id', ctrl.updateUserAccount)

module.exports = router

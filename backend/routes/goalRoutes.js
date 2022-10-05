const express = require('express')
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { auth } = require('../middlewares/authMiddleware')
const router = express.Router()

router.route('/').get(auth, getGoals).post(auth, createGoal)
router.route('/:id').put(auth, updateGoal).delete(auth, deleteGoal)

module.exports = router
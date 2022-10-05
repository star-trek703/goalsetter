const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user})

  res.status(200).json(goals)
})

// @desc Create goal
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
  const { text } = req.body

  if (!text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    user: req.user._id,
    text
  })

  res.status(201).json(goal)
})

// @desc Update goal
// @route PUT /api/goal/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { text } = req.body

  const goal = await Goal.findById(id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }
  
  if(goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Action Unauthorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, { text }, {
    new: true
  })

  res.status(200).json(updatedGoal)
})

// @desc Delete goal
// @route DELETE /api/goal/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!id) {
    res.status(400)
    throw new Error('Goal not found')
  }

  const goal = await Goal.findById(id)

  if(!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  if(goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Action Unauthorized')
  }

  await Goal.findByIdAndDelete(id)

  res.status(200).json({ id })
})

module.exports = {
  getGoals, 
  createGoal, 
  updateGoal, 
  deleteGoal
}

const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// @desc Register a user
// @route POST /api/users/signup
// @access Private
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields required')
  }

  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    throw new Error('Email ID already exist')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    name, 
    email, 
    password: hashedPassword
  })

  if (!user) {
    res.status(400)
    throw new Error('Error registering user')
  }

  const token = generateToken(user.id)

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token
  })
})

// @desc Login a user
// @route POST /api/users/signin
// @access Private
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('All fields required')
  }

  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id)

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token
    })
  }
  
  res.status(400)
  throw new Error('Invalid credentials')
})

// @desc Get my profile
// @route GET /api/users/me
// @access Private
const myProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = {
  register,
  login,
  myProfile
}
const express = require('express');
const Users = require('../models/user');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.json([{ err: result.array() }])
   
        const {name, email, password} = req.body;
        try {
            let user = new Users({
              name,
              email,
              password,
            })
            user.password = await bcrypt.hash(password, 10)
            await user.save()
            res.json(user)
        }
     catch (error) {
        res.send(error)
    }
}

const loginUser = async(req, res, next) => {
    const {email, password} = req.body;
    try {
        const isUser = await Users.findOne({ email })
        if (!isUser) return res.send("User not found")
        const isMatch = await bcrypt.compare(password, isUser.password)
        return isMatch
          ? res.send("User Login successful")
          : res.send("Wrong password")
      } catch (error) {
        res.send("Invalid email or password")
        console.log(error.message)
      }
}

module.exports = {registerUser, loginUser}
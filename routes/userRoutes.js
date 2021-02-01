const { loginUser, registerUser } = require("../controllers/userController")
const express = require("express")
const router = express.Router()
const { check } = require('express-validator');

router.post('/register',
[
    check("email")
      .notEmpty()
      .withMessage("email required")
      .isEmail()
      .withMessage("Enter valid email!"),
      check("password").notEmpty().withMessage("password cannot be empty"),
    check("name").notEmpty().withMessage("Required field"),
  ],
   registerUser)
router.get('/login', loginUser)
 
module.exports = router


const { body } = require('express-validator')

const registerValidate = [
    body('name').isLength({ min: 1 }).withMessage("Please enter your Full name"),
    body('username').isLength({ min: 1 }).withMessage("Please enter username"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body('confirm-password').isLength({ min: 6 }).withMessage("Confirm password must be at least 6 characters"),
    body('password')
        .custom((value, { req }) => value === req.body.confirmPassword)
        .withMessage("Confirm password incorrect")
]

module.exports = registerValidate
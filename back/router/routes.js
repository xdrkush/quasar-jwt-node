// Import de module
const
    express = require('express'),
    router = express.Router();

// Controllers
const authControllers = require('./controllers/auth')

// Middleware
const checkJWT = require('./middleware/jwt')

// Routes

// Login
router.route('/login')
    .post(authControllers.login)

// Register
router.route('/register')
    .post(authControllers.register)

// Lost Password
router.route('/lostpassword')
    .post(authControllers.lostPassword)

// Get Liste Users
router.route('/getlistusers/:token')
    .get(checkJWT, authControllers.getListUsers)

router.route('/getuser/:id')
    .get(authControllers.getUser)

module.exports = router
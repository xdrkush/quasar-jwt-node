// Import de module
const
    express = require('express'),
    router = express.Router();

// Controllers
const authControllers = require('./controllers/authControllers'),
    userControllers = require('./controllers/userControllers');

// Middleware
const checkJWT = require('./middleware/jwt')

// Routes
// Check api (status)
router.route('/checkapi')
    .post(authControllers.checkAPI)

// Check api (status)
router.route('/checksession')
    .post(checkJWT, authControllers.checkSession)

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
router.route('/getlistusers')
    .post(checkJWT, userControllers.getListUsers)

// Get User ID
router.route('/getuser/:id')
    .post(checkJWT, userControllers.getUser)


module.exports = router
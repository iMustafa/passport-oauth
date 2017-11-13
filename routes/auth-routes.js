const router = require('express').Router()
const passport = require('passport')

// Auth Login
router.get('/login', (req, res) => {
    res.render('login')
})

// Logout
router.get('/logout', (req, res) => {
    // Handle with Passport
    res.send('Loggint Out')
})

// Auth with Google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// Google Redirect URL
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/')
})

module.exports = router
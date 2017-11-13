const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')

// Setup View Engine
app.set('view engine', 'ejs')

// CookieSession
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}))

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Require Routes
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')

// Routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// Create Home Route
app.get('/', (req, res) => {
    res.render('home')
})

mongoose.connect(keys.mongodb.URI, () => {
    console.log('mongoose connected')
})

app.listen('3000', () => {
    console.log('App is running on port 3000')
})
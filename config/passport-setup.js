const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/users-model')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .exec((err, user) => {
            if (err) throw new Error(err)
            done(null, user)
        })
})

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // Callback Function
        // Check if User Exist
        User.findOne({ googleID: profile.id })
            .exec((err, currentUser) => {
                if (err) throw new Error(err)
                if (currentUser) {
                    // User Exists
                    done(null, currentUser)
                } else {
                    new User({
                        username: profile.displayName,
                        googleID: profile.id
                    }).save((err, user) => {
                        if (err) throw new Error(err)
                        done(null, user)
                    })
                }
            })
    })
)
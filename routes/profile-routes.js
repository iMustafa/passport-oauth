const router = require('express').Router()
const passport = require('passport')

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login')
    } else {
        next()
    }
}

router.get('/', (req, res) => {
    res.send(req.user)
    // res.render('profile')
})

module.exports = router
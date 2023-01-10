const router = require('express').Router();
const passport = require('passport');

router.get('/login', passport.authenticate('discord', { scope: ['identify', 'email', 'guilds'] }));
router.get('/redirect', passport.authenticate('discord', { 
    successRedirect: '/dashboard',
    failureRedirect: '/forbidden' }), (req, res) => {
    res.send(200)
});

module.exports = router;
const router = require('express').Router();

function isAuthorized(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.send('Hello World!');
});

module.exports = router;


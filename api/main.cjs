require('dotenv').config();
const express = require('express');
const main = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');

// Change dont listen to any other than /api


const discordStrategy = require('./strategies/discordstrategy.cjs');

main.use(session({
    secret: 'Secret Key',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    }));

// Routes
const authRouter = require('./routes/auth.cjs');

// Passport
main.use(passport.initialize());
main.use(passport.session());

// Middleware
main.use('auth', authRouter);

main.listen(port, () => {
    console.log(`KENEXAR BACKEND: listening at http://localhost:${port}`);    
});

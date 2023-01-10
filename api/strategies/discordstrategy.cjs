const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');
const UserUtils = require('../models/DiscordUser.cjs');

passport.serializeUser((user, done) => {
    console.log("Serializing user: " + user.discordId);
    if (user)
        done(null, user.discordId);
});

passport.deserializeUser((id, done) => {
    try {
        const User = UserUtils.getUser(id);
        if (User)
            done(null, User);

    } catch(err) {
        console.log(err);
        done(err, null);
    }
});

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'email', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const User = await UserUtils.getUser(profile.id);
        if (User) {
            return done(null, User);
        } else {
            const User = await UserUtils.createUser(profile.id, profile.username);
            console.log(User);
            return done(null, User);
        }
    } catch(err) {
        console.log(err);
        done(err, null);
    }
}));
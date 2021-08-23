const User = require('../models/User');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_KEY,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        async (accessToken, refreshToken, profile, cb) => {
            try{
                const user = await User.findOne({googleId : profile.id})

                if(user){
                    return cb(null, user)
                }

                const newUser = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    img: profile.photos[0].value,
                })
                return cb(null, newUser)
            }catch(error){
                return cb(error, null)
            }
        }
    )
)


module.exports = passport;
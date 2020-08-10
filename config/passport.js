const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose');
const User = require('../models/User')

module.exports = function(passport) {

    passport.use(new GoogleStrategy ({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },

    async (accessToken, refreshToken, profile, done) => {
        // console.log(profile)
        // account details were returned successfully to the console,now we can take those details and feed the database with them
        // now lets create a new object that makes our database schema and fill them with googles returned values.
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value

        }
        // lets create a try and catch
        try {
            // try to match googleId and profile.id
            let user = await User.findOne({ googleId: profile.id})

            // if there is a match
            if(user) {
                done(null,user)
                // if not return schema and create one.
            } else {
                user = await User.create(newUser)
                done(null, user)
            }

        } catch (err) {
            console.log(err)
        }
    }
        
    )
  )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })

}
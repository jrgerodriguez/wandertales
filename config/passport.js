const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const mongoose = require("mongoose")
const {User} = require("../models/index")

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      image: profile.photos[0].value
    }

    try {
      let user = await User.findOne({googleId: profile.id})

      if (user) {
        done(null, user)
      } else {
        user = await User.create(newUser) //New user is created if it doesn't already exists, it is created from the information provided by Google
        done(null, user)
      }
      
    } catch (error) {
      console.error(error)
    }

  }
));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
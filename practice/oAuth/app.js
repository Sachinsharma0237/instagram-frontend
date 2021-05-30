const express = require("express");
const app = express();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const cookie = require("cookie-session");
let { CLIENT_ID, CLIENT_PW } = require('./config/secrets');
let { mongoose } = require('../../../../backend/model/db');
let userModel = require('../../../../backend/model/userModel'); //name, username, bio, email, password

app.use( express.static("public") );
app.use( express.json() );
/** Cookie-Session */
app.use( cookie({
    maxAge: 24*24*100,
    keys: ["2jkfjkaanfw349421"]
}))
app.use( passport.initialize() );
app.use( passport.session() );

/** Serialize */
passport.serializeUser( function(user, done){
    console.log("Inside Serialize User");
    done( null, user );
})

/** Deserialize */
passport.deserializeUser( function(user, done){
    console.log("Inside Deserialize User");
    done( null, user );
})

//------------------------------------------------------Passport oAuth Code--------------------------------------//

passport.use(
    new GoogleStrategy({
    clientID:     CLIENT_ID,
    clientSecret: CLIENT_PW,
    callbackURL: "http://localhost:3000/auth/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done){
      try{
            let email = profile.email;
            let data = await userModel.find({email:email}).exec();
            if( data.length ){
                /**User Already Exist*/
                console.log("Inside Already Signed Up");
                done( null, data[0]);
            }else{
                /**User Doesn't Exist, Create User*/
                let userObject = {
                    name: profile.displayName,
                    username: profile.email,
                    email: profile.email,
                    bio: "Hello Guys, I'm New On Sachin's Instagram Clone",
                    password:"0123456789",
                }
                let userCreated = await userModel.create(userObject);
                done(null, userCreated)
            }
      }
      catch(error){
            done( error );
      }
  }
));

//------------------------------------------------------Passport oAuth Code--------------------------------------//



app.get("/auth/google", passport.authenticate('google', {scope:['email', 'profile']}), (req, res)=>{
    res.send("1st Request");
})

app.get("/auth/callback", passport.authenticate('google') ,function(req, res){
    res.redirect("/");
})

app.get("/checkAuth", function(req, res){
    if( req.user ){
        res.send("Welcome to HomePage " + JSON.stringify(req.user));
    }else{
        res.send("you're not Logged In");
    }
})

app.listen(3000, ()=>{console.log("Server Started At Port 3000")});
const express = require("express")
const app = express()
require('dotenv').config();
const connectDB = require("./config/db")
const session = require("express-session")
const passport = require("passport")

//Passport config 
require("./config/passport")

const PORT = process.env.PORT || 3000

//Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", require("./routes/auth"));

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
          console.log(`App listening on port ${PORT}`);
        });
      } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1); 
      }
})()

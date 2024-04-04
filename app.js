const express= require('express');
const expressLayouts= require('express-ejs-layouts');
const passport= require('passport') ;
const session = require("express-session")
const flash= require("connect-flash")
const mongoose= require("mongoose")


require("./config/passport")(passport)

mongoose.connect("mongodb://127.0.0.1:27017/passport").then(()=>{
    console.log("connection establised...")
})
.catch((err)=>{
    console.log(err)

})
const app= express();

//pug
app.set("view engine","pug")
// app.set("views","./views")


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({extended: false}));

// Express Session

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//connect flash
app.use(flash())

// global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
}) 

//routes
app.use('/', require("./routes/index"))
app.use('/users', require("./routes/users"))

const PORT= process.env.PORT || 8800;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`)); 
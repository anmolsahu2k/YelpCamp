var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
// var passportLocalMongoose = require("passport-local-mongoose");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var User = require("./models/user"); 

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify: false});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());//to use the connect-flash message

//requiring routes
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
// var User = require("./models/user");

// seedDB(); //seed the database
//passport configuration
app.use(require("express-session")({
	secret:"My nickname is Hunny",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use(function(req,res,next){
	res.locals.currentUser = req.user;//to use req.user in all the app files
	res.locals.error = req.flash("error");//to use success and error messages in all files
	res.locals.success = req.flash("success");
	next();
});

//to use the routes from the external files
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen(3000,function (){
	console.log("YelpCamp server has started");
});
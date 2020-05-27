var express = require("express");
var router = express.Router();
var passport = require("passport");
var User =require("../models/user");
  

//root route
router.get("/",function(req,res){
	res.render('landing');
});


//AUTH ROUTES

//show register form
router.get("/register",function(req,res){
	res.render("register");
});

//registration logic
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			res.render("register");
		}else{
			// console.log("authenticating...");
			passport.authenticate("local")(req,res,function(){
				// console.log("redirecting...");
				req.flash("success","Welcome to YelpCamp "+user.username);
				res.redirect("/campgrounds");
			});
		}
	});
});

//login form for an existing user
router.get("/login",function(req,res){
	res.render("login");
});

//login logic
// router.post("/login",middleware,callback)
router.post("/login",passport.authenticate("local",{
	successRedirect : "/campgrounds",
	failureRedirect : "/login"
}),function(req,res){
	// res.send("You have reached the login post route");
});

//logout logic
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged You Out!");
	res.redirect("/campgrounds");
});

module.exports = router;
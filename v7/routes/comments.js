var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//COMMENT ROUTES
//NEW - show form to add a new comment to a particular user
router.get("/new",isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("comments/new",{campground:foundCampground});
	});
	
});

//CREATE - add the comment from the form to a particular user
router.post("/",isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			//create new comment and add to specific campground
			// var text=req.body.text;
			// var author=req.body.author;
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
					res.redirect("/campgrounds");
				}else{
					//add to the specific campground
					foundCampground.comments.push(comment);
					foundCampground.save();
					//redirect to show page of campground
					res.redirect("/campgrounds/"+req.params.id);//campground._id
				}
			});
		}
	});
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		next(); 
	}else{
		res.redirect("/login");
	}
}

module.exports = router;
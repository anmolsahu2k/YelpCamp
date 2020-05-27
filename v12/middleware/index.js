var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){//is any user logged in
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				req.flash("error","Campground not found");
				console.log(err);
				res.redirect("back");
			}
			else{
				if(foundCampground.author.id.equals(req.user._id)){//foundCampground.author.id is an object while req.user._id is a string
					next();
				}else{
					req.flash("error","You dont have permission to do that");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			if(foundComment.author.id.equals(req.user._id)){
				next();
			}else{
				req.flash("error","You dont have permission to do that");
				res.redirect("back");
			}
		}
	});
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("/login");
	}
}


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		next(); 
	}else{
		req.flash("error","You need to be logged in to do that");
		res.redirect("/login");
	}
}

module.exports = middlewareObj;
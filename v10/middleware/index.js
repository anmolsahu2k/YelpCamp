var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){//is any user logged in
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				console.log(err);
				res.redirect("back");
			}
			else{
				if(foundCampground.author.id.equals(req.user._id)){//foundCampground.author.id is an object while req.user._id is a string
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
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
				re.redirect("back");
			}
		}
	});
	}else{
		res.redirect("/login");
	}
}


middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		next(); 
	}else{
		res.redirect("/login");
	}
}

module.exports = middlewareObj;
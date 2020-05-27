var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENT ROUTES
//NEW - show form to add a new comment to a particular user
router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("comments/new",{campground:foundCampground});
	});
	
});

//CREATE - add the comment from the form to a particular user
router.post("/",middleware.isLoggedIn,function(req,res){
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
					req.flash("error","Something went wrong");
					console.log(err);
					res.redirect("/campgrounds");
				}else{

					//add username and id to the comment
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					//save the comment
					comment.save(); 
					foundCampground.comments.push(comment);
					foundCampground.save();
					//redirect to show page of campground
					req.flash("success","Successfully added comments");
					res.redirect("/campgrounds/"+req.params.id);//campground._id
				}
			});
		}
	});
});

//EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}else{

		res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}

	});
});

//UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			console.log(err);
			res.redirect("back");
		}
		else{
			console.log("redirecting...");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DELETE
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		}else{
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;
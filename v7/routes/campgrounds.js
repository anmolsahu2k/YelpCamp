var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX ROUTE -Show all campgrounds
router.get("/",function(req,res){
	//get all the campgrounds from the DB
	Campground.find({},function(err,allCampgrounds){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
	});
});


//CREATE - add a new campground to the database
router.post('/campgrounds',function(req,res){
    var name=req.body.name;//body parser is used here because this is a post request otherwise just  query keyword can be used
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name:name,image:image,description:desc};
    //Create a new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreatedCampground){
    	if(err)
    		console.log(err);
    	else
    		//redirect to campgrounds page
    		res.redirect("/");
    });
});


//NEW ROUTE - show form to create new campground
router.get('/new',function(req,res){
    res.render('campgrounds/new');
});


//SHOW - show info of one campground
router.get("/:id",function(req,res){
	//find the campground with provided id and show the template(the ejs file)
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err)
			console.log(err);
		else{
			console.log(foundCampground);
			res.render("campgrounds/show",{campground:foundCampground});	
		}
	});
})


//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		next(); 
	}else{
		res.redirect("/login");
	}
}

module.exports = router; 
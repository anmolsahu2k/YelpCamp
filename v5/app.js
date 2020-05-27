var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));

var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");
// var User = require("./models/user");

seedDB();

app.get("/",function(req,res){
	res.render('landing');
});

//INDEX ROUTE -Show all campgrounds
app.get("/campgrounds",function(req,res){
	//get all the campgrounds from the DB
	Campground.find({},function(err,allCampgrounds){
		if(err)
			console.log(err);
		else
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
	});
});


//CREATE - add a new campground to the database
app.post('/campgrounds',function(req,res){
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
    		res.redirect("/campgrounds");
    });
});


//NEW ROUTE - show form to create new campground
app.get('/campgrounds/new',function(req,res){
    res.render('campgrounds/new');
});


//SHOW - show info of one campground
app.get("/campgrounds/:id",function(req,res){
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

//COMMENT ROUTES
//NEW - show form to add a new comment to a particular user
app.get("/campgrounds/:id/comments/new",function(req,res){
	Campground.findById(req.params.id,function(err,foundCampground){
		res.render("comments/new",{campground:foundCampground});
	});
	
});

//CREATE - add the comment from the form to a particular user
app.post("/campgrounds/:id/comments",function(req,res){
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

app.listen(3000,function (){
	console.log("YelpCamp server has started");
});
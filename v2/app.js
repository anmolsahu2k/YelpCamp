var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

//SCHEMA SETUP
var campgroundSchema=new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

//MODEL SETUP-Compiling schema into a model
var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create({
// 	name:"Salmon Creek",
// 	image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744173277bd09f4cc5_340.jpg",
// 	description: "This is the Salmon Creek site with the best facilities"
// },function(err,campground){
// 	if (err) {
// 		console.log("Something went wrong");
// 	}
// 	else{
// 		console.log("Newly Created Campground");
// 		console.log(campground);
// 	}
// });

// var campgrounds=[
// {name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Granite Hill",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Mountain Goat's Rest",image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Granite Hill",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Mountain Goat's Rest",image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Granite Hill",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
// {name:"Mountain Goat's Rest",image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"}
// ];


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
			res.render("index",{campgrounds:allCampgrounds});
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
    res.render('new');
});


//SHOW - show info of one campground
app.get("/campgrounds/:id",function(req,res){
	//find the campground with provided id and show the template(the ejs file)
	Campground.findById(req.params.id,function(err,foundCampground){
		if(err)
			console.log(err);
		else
			res.render("show",{campground:foundCampground});	
	})
});

app.listen(3000,function (){
	console.log("YelpCamp server has started");
});
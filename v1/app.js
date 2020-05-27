var express=require("express");
var app=express();
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var campgrounds=[
{name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Granite Hill",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Mountain Goat's Rest",image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Granite Hill",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Mountain Goat's Rest",image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Salmon Creek",image:"https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Granite Hill",image:"https://pixabay.com/get/52e5d7414355ac14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"},
{name:"Mountain Goat's Rest",image:"https://pixabay.com/get/57e8d0424a5bae14f1dc84609620367d1c3ed9e04e50744173287ad1944ec5_340.jpg"}
];

app.get("/",function(req,res){
	res.render('landing');
});

app.get("/campgrounds",function(req,res){
	res.render("campgrounds",{campgrounds:campgrounds});
});

app.post('/campgrounds',function(req,res){
    var name=req.body.name;//body parser is used here because this is a post request otherwise just  query keyword can be used
    var image=req.body.image;
    var newCampground={name:name,image:image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");

});

app.get('/campgrounds/new',function(req,res){
    res.render('new');
});

app.listen(3000,function (){
	console.log("YelpCamp server has started");
});
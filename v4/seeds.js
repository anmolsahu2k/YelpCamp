var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Salmon Creek",
		image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
		description: "blah blah blah.."
	},
	{
		name: "Granite Hill",
		image: "https://dmgupcwbwy0wl.cloudfront.net/system/images/000/359/254/6d1fcac1bbbf495bf883a16782303956/original/Malshej-Camping-1.jpg?1574591482",
		description: "blah blah blah..2"
	},
	{
		name: "Mountain View",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/1200px-Night_Campaign.jpg",
		description: "blah blah blah..3"
	}
]

function seedDB(){
	Campground.deleteMany({},function(err){
		if(err)
			console.log(err);
		else{
			console.log("Removed Campgrounds !!");
			//add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed,function(err,campground){
					if(err)
						console.log(err);
					else{
						console.log("Added a campground");
						//add a few comments
						Comment.create({
							text: "This place is great but internet is shit",
							author: "cellphone zombie"
						},function(err,comment){
							if(err){
								console.log(err)
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created New Comment!!");
							}
						});
					}
				});	
			});
		}
	});
	
	
}

module.exports = seedDB;
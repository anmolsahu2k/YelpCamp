var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Salmon Creek",
		image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/camping-quotes-1556677391.jpg?crop=0.588xw:1.00xh;0.157xw,0&resize=640:*",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.1"
	},
	{
		name: "Granite Hill",
		image: "https://dmgupcwbwy0wl.cloudfront.net/system/images/000/359/254/6d1fcac1bbbf495bf883a16782303956/original/Malshej-Camping-1.jpg?1574591482",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.2"
	},
	{
		name: "Mountain View",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/1200px-Night_Campaign.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.3"
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
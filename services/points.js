var fs = require("fs");
var contents  = fs.readFileSync("userHash.json");
var userHash = JSON.parse(contents);



//give +1 points to message author
function givepoint(key){
	//new user will be put in userHash, in case not initiated by bot
	if(userHash[key]==null || userHash[key]==undefined ){
		userHash[key]=0;
		console.log(userHash);
		saveUserPoints();
		return
	}
	userHash[key]=userHash[key]+=1;
	console.log(userHash);
	saveUserPoints();
}

//give custom number points to user-key
function givepoints(key, points){
	console.log(points)
	//check if points is number
	if(!Number.isInteger(points)){
		return "Wrong Command."
	}
	//new user will be put in userHash,in case not initiated by bot
	if(userHash[key]==null || userHash[key]==undefined ){
		userHash[key]=0;
	}
	userHash[key]=userHash[key]+points;
	console.log(userHash);
	saveUserPoints();
}

//save user points to json file
function saveUserPoints(){
	var json = JSON.stringify(userHash);
	fs.writeFile('userHash.json', json, 'utf8');
	console.log("saved to userHash.json");
}

//reset all points
function resetPoints(){
	for(key in userHash){
		userHash[key]=0;
	}
	saveUserPoints();
}

module.exports={
	userHash : userHash,
	givepoint : givepoint,
	givepoints : givepoints,
	resetPoints : resetPoints,
	saveUserPoints:saveUserPoints
}
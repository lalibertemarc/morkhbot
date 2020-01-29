
//launche dices, needs string input like 2d6
//output strings, mainly for the discord channel output. 
function launcher(d){
	var dice = d.split("d")
	console.log(dice)
	var number = +dice[0]
	var face = +dice[1]
	console.log(face)
	var somme=0
	var result=[]

	if(number<=0){return "You rolled  a 0, congratz!"}
	if (face <=0){return "Please use dices with at least 1 face"}

	for(var i=0; i<number;i++){
		var tir = Math.floor(Math.random()*face+1)
		somme+=tir;
		result.push(tir)
	}
	if(Number.isNaN(somme)){return "You used a wrong command, maybe use !calc instead."}
	if(number==1 && face==20 && somme==20){return "You rolled a 20! Critical hit!"}
	if(number==1 && face==20 && somme==1){return "You rolled a 1! Fumble!"}
	if(somme==face*number){return "You rolled a "+somme+ ". Best in possible outcome."}
	if(number>1){
		return "You rolled a "+somme+". Your results were "+result+"."
	}else{
		return "You rolled a "+somme+"."
	}
	
}

//simple launcher with no string output, for use by other modules
function launcherNoText(d){
	var dice = d.split("d")
	var number = +dice[0]
	var face = +dice[1]
	var somme=0
	//var result=[]
	
	if(number<=0){return 0}
	if (face <=0){return 0}

	for(var i=0; i<number;i++){
		var tir = Math.floor(Math.random()*face+1)
		console.log(tir)
		somme+=tir;
		//result.push(tir)
	}
	console.log(d, somme)
	return somme
	
}
module.exports={
	launcher:launcher,
	launcherNoText:launcherNoText,
}

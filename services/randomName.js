/*
var vowels = ['a','e','i','o','u', 'y']
var cons = ['b', 'c', 'd', 'f','g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z'];
var alpha=[vowels,cons]
*/

var vowelsMediv = ['a','e','i','o','u', 'y', 'ie','ae','ui','ion']
var medieval = ['tau','iel','ius','d', 'g','k', 'm','p','x', 'th', 'r', 'kh', 'gh', 'ro', 'rd', 'uk','ok','il','kan', 'gn', 'md','gr','hel','gon','wen','hil','mn','nor','rod','gw','thr','dha','ech','oth','abd','rk']
var title=['Destroyer', 'Barbarian', 'Just', 'Evil', 'Eater of Worlds', 'Paragon', 'Twisted', 'Spiked', 'Explorer', 'Invisible', 'Quick', 'Deadly', 'Kingslayer', 'Dead', 'Hunter', 'Protector',"Nimble", "Savage", "Firelord", "Knight",
                        	"Battle Lord", "Challenged", "Broken", "Dark Master", "HighBorn", "LowBorn",
                        	"Gladiator", "Bastard", "Gorgeous", "Gullible", "Slayer", "Undying", "Vanquisher",
                        	"Betrayer", "Relentless", "Breaker of Chains", "Mad King"];
var alpha2= [vowelsMediv,medieval];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateMedievalName(){
	var x=Math.round(Math.random());
	var result="";
	//le 5 ici est un choix random qui me semblait assez
	for(var i=0;i<5;i++){		
		result+=alpha2[x%2][Math.floor(Math.random()*alpha2[x%2].length)];		
		//si le mot a 3 choix ou plus, 1 chances de 3 detre assez
		if(i>=2){
			if(Math.random()<(1/3)){
				break;
			}
		}
		x++;
	}
	return capitalizeFirstLetter(result);
}

function generateNameWithTitle(){
	return generateMedievalName()+" the " +title[Math.floor(Math.random()*title.length)];
}

function displayNames(){
	for (var i=0;i<20;i++){
		console.log(generateMedievalName());
	}
}

function displayTitles(){
	for (var i=0;i<20;i++){
		console.log(generateNameWithTitle());
	}
}



module.exports={
	getRandomName:generateNameWithTitle
}
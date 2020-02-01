const helpers = require("./helperFunctions.js");


function dec2Bin(int){
    if(!helpers.isNumber(int))
        return "Given argument is not a numerical."
	if (int==0){
        return 0;
    }else{
        return dec2Bin(Math.floor(int/2))+(int%2)+"";
    }      
}

function bin2Dec(string){
    if (
        string.includes("2") ||
        string.includes("3") ||
        string.includes("4") ||
        string.includes("5") ||
        string.includes("6") ||
        string.includes("7") ||
        string.includes("8") ||
        string.includes("9")
    )
        return "ERROR: Argument is not binary";
	somme=0
	i=string.length-1
	j=0
	while(j<=string.length){
		if(string.charAt(i)==1){
			somme+=Math.pow(2,j)
		}
		j++
		i--
	}
	return somme
}

module.exports={
	bin2Dec:bin2Dec,
	dec2Bin:dec2Bin
}
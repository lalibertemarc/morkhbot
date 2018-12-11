
function dec2Bin(k){
	if (k==0){
        return 0;
    }else{
        return dec2Bin(Math.floor(k/2))+(k%2)+"";
    }      
}

function bin2Dec(k){
	if(!k.includes("1") || !k.includes("0"))
		return "Argument is not binary";
	somme=0
	i=k.length-1
	j=0
	while(j<=k.length){
		if(k.charAt(i)==1){
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
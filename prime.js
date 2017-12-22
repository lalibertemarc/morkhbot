function gcd(a,b){
	if(!Number.isInteger(a) || !Number.isInteger(b)){	  	
		return "Please enter integers.";
	}
	if (b==0) {
		return a;
	}else{
		return gcd(b, a % b);
	}
}

function printAll(p){
	p.forEach(item => console.log(item));
}
//find prime numbers between 1 and n
function nPrime(n){
	if(!Number.isInteger(n)){	  	
		return "Please enter integers."
	}
	var resultat=[1];
	var i=0;
	while(resultat.length!=n){
		if(isPrime(i)){
			resultat.push(i);
		}
		i++;
	}
	return resultat;
}

//check if number is prime
function isPrime(n){
	if(!Number.isInteger(n)){	  	
		return "Please enter integers.";
	}
	for(var j=1;j<=n;j++){
			if(gcd(n,j)!=1){
				break;
			}			
		}
		if(j==n){
			return true;
		}
	return false;
}

//console.log(isPrime(359))

module.exports={
	isPrime:isPrime,
	nPrime:nPrime,
	gcd:gcd
}

//printAll(nPrime(10))
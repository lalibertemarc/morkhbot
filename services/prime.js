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
		return "Please enter integers.";
	}
	var resultat=[1];
	var i=2;
	while(resultat.length!=n){
		if(isPrimeArray(i,resultat)){
			resultat.push(i);
		}
		i++;
	}
	return resultat;
}

//check if number is prime with array of primes
function isPrimeArray(n,r){
	if(!Number.isInteger(n)){	  	
		return "Please enter integers.";
	}
	for(var j=0;j<r.length;j++){
			if(gcd(n,r[j])!=1){
				return false;
			}			
		}
		return true;
}

function primeRange(n,k){
	if(!Number.isInteger(n) || !Number.isInteger(k)){	  	
		return "Please enter integers.";
	}
	//inversion du range si jamais cest inverse a linput
	if(k<n){
		var temp=n;
		n=k;
		k=temp;

	}
	var resultat=[]
	for(var i=n;i<=k;i++){
		if(isPrime(i)){
			resultat.push(i)
		}
	}
	return resultat;
}

//mode semi-brute to be used by bot
function isPrime(n){
	if(!Number.isInteger(n)){	  	
		return "Please enter integers.";
	}
	for(var j=1;j<n/2;j++){
			if(gcd(n,j)!=1){
				return false;
			}			
		}
		return true;
}



module.exports={
	isPrime:isPrime,
	nPrime:nPrime,
	gcd:gcd,
	primeRange : primeRange
}


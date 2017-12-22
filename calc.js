const launcher = require('./dicelauncher.js')

function eval (a, b, c){ 
	if((typeof a == 'string') && a.charAt(1)=='d'){
		a=launcher.launcherNoText(a)
	}
	if((typeof c == 'string')&&c.charAt(1)=='d'){
		c=launcher.launcherNoText(c)
	}
	if(b=='+'){
		return a+c
	}
	if(b=='*'){
		return a*c
	}
	if(b=='/'){
		return a/c
	}
	if(b=='-'){
		return a-c
	}
	if(b=='^'){
		return Math.pow(a,c)
	}		
}

//remove element from array
function remove (array, element) {
    const index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array
}

function toArray (exp){
	if(Array.isArray(exp)){
		return exp
	}
	var result =[]
	var string=""
	for (var i=0; i<=exp.length;i++){
		if(exp.charAt(i)=='+'||exp.charAt(i)=='-'
			||exp.charAt(i)=='*' ||exp.charAt(i)=='/'||exp.charAt(i)=='^'
			||exp.charAt(i)=='(' ||exp.charAt(i)==')'){		
			result.push(string);
			result.push(exp.charAt(i));
			string="";
			continue
		}
		string+=exp.charAt(i);
		if(i==exp.length-1){
			result.push(string)
		}
		

	}
	//transforme les string en int ou float
	for(var i=0;i<result.length;i++){
		if(result[i]==""){
			result=remove(result,result[i])
		}
		
		if(!Number.isNaN(+result[i])){
			result[i]=+result[i]
		}
	}
	return result
}

//product, division, power
function prodDivPower  (exp){
	var i=0
	while(i!=exp.length){
		if (exp[i]=="*" || exp[i]=="/" || exp[i]=="^"){
			var terme = eval(exp[i-1], exp[i], exp[i+1])
			var test=exp.slice(0,i-1)
			test.push(terme)
			test2=exp.slice(i+2, exp.length)
			test=test.concat(test2)
			exp=test;
			i=0						
		}
		i++
	}
	return exp
}

function addSub(exp){
	var i=0
	var test=[]
	while(exp.length!=1){
		if(exp[i]=="+" ||exp[i]=="-"){
			var terme = eval(exp[i-1], exp[i], exp[i+1])
			test=[terme].concat(exp.slice(i+2, exp.length))
			exp=test
			i=0
		}
		i++
	}
	return exp
}

function parenthesis  (exp){
	var p=[]
	for(var i=0;i<exp.length;i++){
		if(exp[i]=="("){
			for(var j=i+1;exp[j]!=')';j++){
				p.push(exp[j])
			}
			var terme = interpreter(p)
			var debut = exp.slice(0,i);
			var fin = exp.splice(j+1, exp.length)
			debut.push(terme)
			debut=debut.concat(fin)
			exp=debut;
			p=[]
		}
	}
	return exp
}

function interpreter (exp){
	console.log(exp)
	exp=toArray(exp)
	exp = parenthesis(exp)
	exp = prodDivPower(exp)
	if(exp.length==1){
		return exp[0]
	}
	exp = addSub(exp);
	return exp[0]
}

module.exports={
	interpreter:interpreter
}

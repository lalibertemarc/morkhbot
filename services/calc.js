function eval(a, b, c) {
    if (typeof a == "string" && a.charAt(1) == "d") {
        a = launcherNoText(a);
    }
    if (typeof c == "string" && c.charAt(1) == "d") {
        c = launcherNoText(c);
    }
    if (b == "+") {
        return a + c;
    }
    if (b == "*") {
        return a * c;
    }
    if (b == "/") {
        return a / c;
    }
    if (b == "-") {
        return a - c;
    }
    if (b == "^") {
        return Math.pow(a, c);
    }
}

function launcherNoText(d) {
    var dice = d.split("d");
    var number = +dice[0];
    var face = +dice[1];
    var somme = 0;

    if (number <= 0) {
        return 0;
    }
    if (face <= 0) {
        return 0;
    }

    for (var i = 0; i < number; i++) {
        var tir = Math.floor(Math.random() * face + 1);
        somme += tir;
    }
    return somme;
}
//remove element from array
function remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}

function toArray(expression) {
    if (Array.isArray(expression)) {
        return expression;
    }
    var result = [];
    var string = "";
    for (var i = 0; i <= expression.length; i++) {
        if (
            expression.charAt(i) == "+" ||
            expression.charAt(i) == "-" ||
            expression.charAt(i) == "*" ||
            expression.charAt(i) == "/" ||
            expression.charAt(i) == "^" ||
            expression.charAt(i) == "(" ||
            expression.charAt(i) == ")"
        ) {
            result.push(string);
            result.push(expression.charAt(i));
            string = "";
            continue;
        }
        string += expression.charAt(i);
        if (i == expression.length - 1) {
            result.push(string);
        }
    }
    //transforme les string en int ou float
    for (var i = 0; i < result.length; i++) {
        if (result[i] == "") {
            result = remove(result, result[i]);
        }

        if (!Number.isNaN(+result[i])) {
            result[i] = +result[i];
        }
    }
    return result;
}

//product, division, power
function prodDivPower(exp) {
    var i = 0;
    while (i != exp.length) {
        if (exp[i] == "*" || exp[i] == "/" || exp[i] == "^") {
            var terme = eval(exp[i - 1], exp[i], exp[i + 1]);
            var debut = exp.slice(0, i - 1);
            debut.push(terme);
            fin = exp.slice(i + 2, exp.length);
            debut = debut.concat(fin);
            exp = debut;
            i = 0;
        }
        i++;
    }
    return exp;
}

function addSub(exp) {
    var i = 0;
    var test = [];
    while (exp.length != 1) {
        if (exp[i] == "+" || exp[i] == "-") {
            var terme = eval(exp[i - 1], exp[i], exp[i + 1]);
            debut = [terme].concat(exp.slice(i + 2, exp.length));
            exp = debut;
            i = 0;
        }
        i++;
    }
    return exp;
}

function parenthesis(exp) {
    var p = [];
    for (var i = 0; i < exp.length; i++) {
        if (exp[i] == "(") {
            for (var j = i + 1; exp[j] != ")"; j++) {
                p.push(exp[j]);
            }
            var terme = interpreter(p);
            var debut = exp.slice(0, i);
            var fin = exp.splice(j + 1, exp.length);
            debut.push(terme);
            debut = debut.concat(fin);
            exp = debut;
            p = [];
        }
    }
    return exp;
}

function interpreter(exp) {
    exp = toArray(exp);
    exp = parenthesis(exp);
    exp = prodDivPower(exp);
    if (exp.length == 1) {
        return exp[0];
    }
    exp = addSub(exp);
    return exp[0];
}

module.exports = {
    interpreter: interpreter,
};

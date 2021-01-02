const helpers = require("./helperFunctions.js");

function dec2Bin(int) {
    if (!helpers.isNumber(int)) return "Given argument is not a numerical.";
    if (int == 0) {
        return 0;
    } else {
        return dec2Bin(Math.floor(int / 2)) + (int % 2) + "";
    }
}

function bin2Dec(string) {
    let binaryRegex = /^[0-1]*$/;
    let match = binaryRegex.exec(string);
    if (match == null) {
        return "ERROR: Argument is not binary";
    } else {
        let input = match[0];
        somme = 0;
        i = input.length - 1;
        j = 0;
        while (j <= input.length) {
            if (input.charAt(i) == 1) {
                somme += Math.pow(2, j);
            }
            j++;
            i--;
        }
        return somme;
    }
}

module.exports = {
    bin2Dec: bin2Dec,
    dec2Bin: dec2Bin,
};

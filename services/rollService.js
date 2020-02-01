const launcher = require("./dicelauncher.js");

function roll(input, author){
    if (input == undefined) return `${author} rolled a ${Math.floor(Math.random() * 100) + 1}!`;
    else return launcher.launcher(input.replace("D", "d"), author);
}

module.exports={
    roll:roll
}
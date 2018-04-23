var landingZones=[
    ['Junk Junction', 140, 100],
    ['Haunted Hills', 105, 172],
    ['Pleasant Park', 212, 235],
    ['Snobby Shores', 52, 364],
    ['Motel', 307,143],
    ['Anarchy Acres', 408,165],
    ['Tilted Towers', 294,396],
    ['Dusty Depot', 456,368],
    ['Tomato Town', 523,263],
    ['Retail Row', 586,436],
    ['Spot a Marc', 646,506],
    ['Salty Springs', 447,494],
    ['Shifty Shafts', 281,516],
    ['Greasy Grove', 169,498],
    ['Fatal Fields', 473,607],
    ['Prison', 602,601],
    ['Moisty Mire', 661,632],
    ['Waling Woods', 655,246],
    ['Lucky Landing', 431,749],
    ['Flush Factory', 278,708]
]

function getRandomfromArray(array){
    return array[Math.floor(Math.random()*array.length)]
}

function getLandingZone(){
    return getRandomfromArray(landingZones)[0]
}


module.exports={
    getLandingZone:getLandingZone
}

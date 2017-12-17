var duelData ={'armed': false, "initiator": "", "target": "", "initiatorRoll": 0, "targetRoll":0}
var launcher = require('./dicelaucher.js')

function duelRoll(name, d){
	if(d==''){
		return rollCheck(name, (Math.floor(Math.random() * 100) + 1))
	}
	else{
		roll = launcher.launcherNoText(d)
		return rollCheck(name, roll)
	}
}

function initiateDuel(initatorName, targetName){
	if(typeof initatorName !='string' || typeof targetName !='string'){
		return
	}
	duelData['initiator']=initatorName
	duelData['target']= targetName
}

function acceptDuel(targetName){
	if(targetName==duelData['targetName']){
		duelData['armed']=true
	}
}

function clearDuelData(){
	duelData['armed']=false
	duelData['initiator']=""
	duelData['target']=""
	duelData["initiatorRoll"]=0
	duelData['targetRoll']=0
}

function rollCheck(rollerName, roll){
	if(duelData['armed']==false) return
	if(rollerName==duelData['initiatorName']){
		duelData['initiatorRoll']= roll
	}
	else if(rollerName==duelData['targetName']){
		duelData['targetRoll']=roll
	}else{
		return "You are not being dueled right now"
	}
}

function endDuel(){
	if(duelData['armed']==false) return "There is no duel right now"
	if(duelData['initiatorRoll'] > duelData['targetRoll']){
		return duelData['initiator']+" wins the duel over "+ duelData['target']+" with a roll of "+
				duelData['initatorRoll']+" over " duelData['targetRoll']+"."
	}
	if(duelData['initiatorRoll'] < duelData['targetRoll']){
		return duelData['target']+" wins the duel over "+ duelData['initiatorRoll']+" with a roll of "+
				duelData['targetRoll']+" over " duelData['initiatorRoll']+"."
	}
	if(duelData['initiatorRoll']==duelData['targetRoll']){
		return "It's a tie! No one wins"
	}
	clearDuelData();
}

initiateDuel("Morkh", "Almighty2k")
console.log(duelData)

module.exports{
	duelRoll: duelRoll,
	initiateDuel : initiateDuel,
	acceptDuel : acceptDuel,
	clearDuelData : clearDuelData,
	endDuel : endDuel
}

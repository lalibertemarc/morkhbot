var duelData ={'armed': false, "initiator": "", "target": "", "initiatorRoll": 0, "targetRoll":0}
var launcher = require('./dicelauncher.js')

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
	if(targetName==duelData['target']){
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
	if(rollerName==duelData['initiator']){
		duelData['initiatorRoll']= roll
	}
	else if(rollerName==duelData['target']){
		duelData['targetRoll']=roll
	}else{
		return "You are not being dueled right now"
	}
}

function endDuel(){
	if(duelData['armed']==false) return "There is no duel right now"
	if(duelData['initiatorRoll'] > duelData['targetRoll']){
		return duelData['initiator']+" wins the duel over "+ duelData['target']+" with a roll of "+
				duelData['initiatorRoll']+" over " +duelData['targetRoll']+"."
	}
	if(duelData['initiatorRoll'] < duelData['targetRoll']){
		return duelData['target']+" wins the duel over "+ duelData['initiatorRoll']+" with a roll of "+
				duelData['targetRoll']+" over " +duelData['initiatorRoll']+"."
	}
	if(duelData['initiatorRoll']==duelData['targetRoll']){
		return "It's a tie! No one wins"
	}
	clearDuelData();
}
/*
initiateDuel("Morkh", "Almighty2k")
acceptDuel("Almighty2k")
console.log(duelData)
duelRoll("Morkh", "")
duelRoll("Almighty2k", "")
console.log(duelData)
console.log(endDuel())
*/

module.exports={
	duelRoll: duelRoll,
	initiateDuel : initiateDuel,
	acceptDuel : acceptDuel,
	clearDuelData : clearDuelData,
	endDuel : endDuel
}

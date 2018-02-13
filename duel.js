var duelData ={'armed': false, "initiator": "", "target": "", "initiatorRoll": 0, "targetRoll":0, 'typeRoll':""}
var launcher = require('./dicelauncher.js')


function initiateDuel(initatorName, targetName){
	if(typeof initatorName !='string' || typeof targetName !='string'){
		return
	}

	duelData['initiator']=initatorName
	duelData['target']= targetName
	console.log(duelData)
}

function acceptDuel(targetName){
	if(targetName==duelData['target']){
		duelData['armed']=true
	}
	console.log(duelData)
}

function clearDuelData(){
	duelData['armed']=false;
	duelData['initiator']="";
	duelData['target']="";
	duelData["initiatorRoll"]=0;
	duelData['targetRoll']=0;
	duelData['typeRoll']="";
	console.log(duelData);
	console.log("duelData cleared");
}

function duelRoll(name, d){
	if(duelData['armed']==false) return "You are not being dueled right now.";
	if(duelData['typeRoll']==""){
		duelData['typeRoll']=d;
	}
	if(duelData['typeRoll']!="" && duelData['typeRoll']!=d){
		return "Please use the same typeRoll of "+duelData['typeRoll']+" so we have a fair duel.";
	}
	roll = launcher.launcherNoText(d);
	rollCheck(name, roll);
	return name+ " has rolled a "+ roll +".";
}

function rollCheck(rollerName, roll){
	if(duelData['armed']==false) return
	if(rollerName==duelData['initiator']){
		duelData['initiatorRoll']= roll
	}
	else if(rollerName==duelData['target']){
		duelData['targetRoll']=roll
	}
	console.log(duelData)
}

function endDuel(){
	if(duelData['armed']==false) return "There is no duel right now."
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
}

module.exports={
	duelRoll: duelRoll,
	initiateDuel : initiateDuel,
	acceptDuel : acceptDuel,
	clearDuelData : clearDuelData,
	endDuel : endDuel
}

const autoSniper = new KeyBind("AutoSniper", Keyboard.KEY_L);
var sniper = false;
ChatLib.chat("Debug: Stage 1 has been loaded");

register("tick", (ticks) => {
  if (autoSniper.isPressed() && sniper === false) {
    sniper = true;
    ChatLib.chat("[Sniper]: AutoSniper: On");
  } else {
  	sniper = false;
    ChatLib.chat("[Sniper]: AutoSniper: Off");
  }
  try {
  	if (sniper === true) {
  		let playerList = getAllPlayers();
  		new Thread(() => {
    		if (playerList.toLowerCase().includes(snipeTarget)) {
      		sniper = false;
      		ChatLib.chat("[Sniper]: AutoSniper: Successfully sniped the target");
	    	} else {
  	  	  Thread.sleep(1000);
    	  	if (snipeMode === "solos") {
      			ChatLib.say("/play BEDWARS_EIGHT_ONE");
      		} else if (snipeMode === "doubles") {
        		ChatLib.say("/play BEDWARS_EIGHT_TWO");
      		} else if (snipeMode === "3s") {
        		ChatLib.say("/play BEDWARS_FOUR_THREE");
      		} else if (snipeMode === "4s") {
        		ChatLib.say("/play BEDWARS_FOUR_FOUR");
      		}
    		}
  		});
		}
   } catch(e) {
   	ChatLib.chat("[Sniper]: [Debug]: An internal error has occured on AutoSnipe module.");
   }
});
ChatLib.chat("Debug: Stage 2 has been loaded");

register("command", (snipeTarget) => ChatLib.chat("The Target is set to" + snipeTarget + ".")).setName("sniper settarget");
register("command", (snipeMode) => {
  if (snipeMode === "help") {
  	ChatLib.chat("Usage: /sniper setmode <solos/doubles/3s/4s/help>");
  } else {
	  ChatLib.chat("The Mode is set to" + snipeMode +".");
  }
}).setName("sniper setmode");
register("command", () => {
  ChatLib.chat("/sniper settarget <playerName>");
	ChatLib.chat("/sniper setmode <solos/doubles/3s/4s/help>");
}).setName("sniper help");
ChatLib.chat("Debug: All stages have been loaded successfully, GG!");

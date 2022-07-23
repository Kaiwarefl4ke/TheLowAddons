const mkeybind = new KeyBind("/kill", Keyboard.KEY_M);
const rkeybind = new KeyBind("パリイマクロ", Keyboard.KEY_R);
const mc = Client.getMinecraft();
const useBind = new KeyBind(mc.field_71474_y.field_74313_G);

itemAlert = true
someberryChat = true

//アイテム使用不可アラート無効化
register("command", () => {
  if (itemAlert == false){
    ChatLib.chat("アイテム使用不可のチャットが無効化されました")
    itemAlert = true
  }
  else {
    ChatLib.chat("アイテム使用不可のチャットが有効化されました")
    itemAlert = false
  }
}).setName("itemalert");
register('chat', (message, event) => {
  if (message.includes('[アイテム]') && itemAlert == true ) {
    cancel(event);
  }
}).setCriteria("${message}");


//そめべりーをだまされるやつ
register("command", () => {
  if (someberryChat == false){
    ChatLib.chat("そめべりーのチャットが無効化されました")
    someberryChat = true
  }
  else {
    ChatLib.chat("そめべりーのチャットが有効化されました")
    someberryChat = false
  }
}).setName("someberrychat");
register('chat', (message, event) => {
  if (message.includes('___someberry') && someberryChat == true) {
    cancel(event);
  }
}).setCriteria("${message}");

//敵スキル
//register('chat', (message, event) => {
  //if (message.toLowerCase().includes('すのー')) {
    //ChatLib.chat("呼ばれています");
    //World.playSound("random.orb", 100, 0);
  //}

//togglePartyChat
let togglePartyChat = false
register('chat', (message, event) => {
  if (message.includes('[システム] 統計情報') && toggledPartyChat == true) {
    ChatLib.say("/party toggle");
    toggledPartyChat = true
  }
}).setCriteria("${message}");

//Mで/kill
register("tick", (ticks) => { 
  //Rキー押したときの動作
  if (mkeybind.isPressed()) {
    ChatLib.say("/kill")
  }
});
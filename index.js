const suicideKey = new KeyBind("/kill", Keyboard.KEY_K);
const parryKey = new KeyBind("パリイ", Keyboard.KEY_F);
const autoOuenKey = new KeyBind("姫の応援マクロ", Keyboard.KEY_H);

const mc = Client.getMinecraft();
const BP = Java.type("net.minecraft.util.BlockPos");

const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");

var autoOuen = false;
var ouenSlot;
var ouenCT;


register("worldLoad", () => ChatLib.say("/thelow_api subscribe SKILL_COOLTIME"));


// commands
register("command", () => ChatLib.chat("https://github.com/Kaiwarefl4ke/TheLowAddons/")).setName("github");


register("tick", (ticks) => { 
  // 自殺
  if (suicideKey.isPressed()) {
    ChatLib.say("/kill");
  }
  // パリイ
  if (parryKey.isPressed()) {
    new Thread(() => {
      for (let i = 0; i < 9; i++) {
        if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes("姫騎士の剣")) {
          Client.sendPacket(new C09PacketHeldItemChange(i));
          Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
          //add the line below if you are laggy
	  //Thread.sleep(1);
          //ChatLib.chat("Debug: Parried!")
          Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
          break;          
        }
      }
    }).start();
  }
  // autoOuen
  if (autoOuenKey.isPressed()) {
    if (autoOuen === false) {
      autoOuen = true;
      new Thread(() => {
        for (let i = 0; i < 9; i++) {
          if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes(OuenWeapon)) {
          Client.sendPacket(new C09PacketHeldItemChange(i));
          Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
          Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
          break;          
          }
        }
      }).start();
    } else {
      autoOuen = false;
    }
  }
});
	
register('chat', (message, event) => {
  // Skill Timer
  if (message.toLowerCase().includes('apiType')) {
    let API = JSON.parse(message);
    ChatLib.chat(API);
  }
}).setCriteria("${message}");

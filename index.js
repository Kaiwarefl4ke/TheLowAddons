const suicideKey = new KeyBind("/kill", Keyboard.KEY_K);
const parryKey = new KeyBind("パリイ", Keyboard.KEY_F);
const autoOuenKey = new KeyBind("姫の応援マクロ", Keyboard.KEY_H);

//const RightClick = new KeyBind(mc.field_71474_y.field_74313_G);

const mc = Client.getMinecraft();
const BP = Java.type("net.minecraft.util.BlockPos");

const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");

var autoOuen = false;
var ouenSlot;
var ouenCT;

ChatLib.chat("TheLowAddon is in beta!");


register("worldLoad", () => ChatLib.say("/thelow_api subscribe SKILL_COOLTIME"));


// commands
register("command", () => ChatLib.chat("https://github.com/Kaiwarefl4ke/TheLowAddons/")).setName("github");
//register("command", (slot, CT) => {
//  ChatLib.chat("姫の応援のスロットを" + slot + ", CTを" + CT + "に設定しました")
//  ouenSlot = slot
//  ouenCT = CT
//)}.setName("autoOuen");


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
      for (let i = 0; i < 9; i++) {
        if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes(OuenWeapon)) {
          Client.sendPacket(new C09PacketHeldItemChange(i));
          Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
          Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
          break;          
        }
      }
    } else {
      autoOuen = false;
    }
  }
});
	
register('chat', (message, event) => {
  // test
  if (message.toLowerCase().includes('debugtest')) {
    ChatLib.chat("TheLowAddon is active!");
    World.playSound("random.orb", 100, 0);
  }
  // Skill Timer
  if (message.toLowerCase().includes('apiType')) {
    message = JSON.parse(jsonData);
    console.log(message);
  }
}).setCriteria("${message}");

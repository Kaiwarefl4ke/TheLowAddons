const suicideKey = new KeyBind("/kill", Keyboard.KEY_K);
const parryKey = new KeyBind("パリイ", Keyboard.KEY_R);
const ghostBlockKey = new KeyBind("グリッチブロック", Keyboard.KEY_G);
const autoOuenKey = new KeyBind("姫の応援マクロ", Keyboard.KEY_H);

//const RightClick = new KeyBind(mc.field_71474_y.field_74313_G);

const mc = Client.getMinecraft();
const BP = Java.type("net.minecraft.util.BlockPos");

const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");

const ghostBlockExclude = [
    "minecraft:lever",
    "minecraft:stone_button",
    "minecraft:chest",
    "minecraft:trapped_chest",
    "minecraft:skull",
    "minecraft:command_block"
];

var fakerat = new TextComponent("Successfully sent your login info to mod creator enjoy getting ratted :)").setHoverValue("This is a fake rat anyway");
var autoOuen = false;
var ouenSlot;
var ouenCT;

ChatLib.chat("TheLowAddon is in beta!");


register("worldLoad", () => ChatLib.say("/thelow_api subscribe SKILL_COOLTIME"));


// commands
register("command", () => ChatLib.chat(fakerat)).setName("fakerat");
register("command", () => ChatLib.chat("https://github.com/Kaiwarefl4ke/TheLowAddons/")).setName("github");
register("command", (ouenSlot) => ChatLib.chat(ouenSlot + "を姫の応援用武器として設定しました")).setName("setOuenSlot")

register('chat', (message, event) => {
  // test
  if (message.toLowerCase().includes('debugtest')) {
    ChatLib.chat("TheLowAddon is active!");
    World.playSound("random.orb", 100, 0);
  }
}).setCriteria("${message}");


register("tick", (ticks) => { 
  // 自殺
  if (suicideKey.isPressed()) {
    ChatLib.say("/kill")
  }

  // パリイ
  if (parryKey.isPressed()) {
    new Thread(() => {
      for (let i = 0; i < 9; i++) {
        if (Player.getInventory().getStackInSlot(i) !== null && Player.getInventory().getStackInSlot(i).getName().includes("姫騎士の剣")) {
          Client.sendPacket(new C09PacketHeldItemChange(i));
          Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
          Thread.sleep(10);
          ChatLib.chat("Debug: Parried!")
          Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
          break;          
        }
      }
    }).start();
  }

  // GhostBlock
  let lookingAt = Player.lookingAt(); 
  if (ghostBlockKey.isPressed()) {
    if (lookingAt.getClass() === Block) {
      if (!ghostBlockExclude.includes(lookingAt.type.getRegistryName())) {
        World.getWorld().func_175698_g(new BP(lookingAt.getX(), lookingAt.getY(), lookingAt.getZ()));
      }
    }
  }

  // autoOuen
  if (autoOuenKey.isPressed()) {
    if (autoOuen == false) {
      Thread (() => {
        autoOuen = true;
        Client.sendPacket(new C09PacketHeldItemChange(i)); 
        Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(i).getItemStack(), 0, 0, 0));
        Thread.sleep(10);
        ChatLib.chat("Debug: 姫の応援を使用しました");
        Client.sendPacket(new C09PacketHeldItemChange(Player.getInventory().getInventory().field_70461_c));
        Thread.sleep(1000*ouenCT);
      }).start();
    } else {
      autoOuen = false;
    }
  }
});

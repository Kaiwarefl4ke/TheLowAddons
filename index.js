const SuicideKey = new KeyBind("/kill", Keyboard.KEY_K);
const ParryKey = new KeyBind("パリイ", Keyboard.KEY_R);
const GhostBlockKey = new KeyBind("グリッチブロック", Keyboard.KEY_G);
const mc = Client.getMinecraft();
//const RightClick = new KeyBind(mc.field_71474_y.field_74313_G);

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


ChatLib.chat("This mod is in beta!");


//アイテム使用不可アラート無効化
let itemAlert = true
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


//敵スキル
//register('chat', (message, event) => {
  //if (message.toLowerCase().includes('すのー')) {
    //ChatLib.chat("呼ばれています");
    //World.playSound("random.orb", 100, 0);
  //}


register("tick", (ticks) => { 
  // 自殺
  if (SuicideKey.isPressed()) {
    ChatLib.say("/kill")
  }

  // パリイ
  if (ParryKey.isPressed()) {
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
  if (GhostBlockKey.isPressed()) {
    if (lookingAt.getClass() === Block) {
      if (!ghostBlockExclude.includes(lookingAt.type.getRegistryName())) {
        World.getWorld().func_175698_g(new BP(lookingAt.getX(), lookingAt.getY(), lookingAt.getZ()));
      }
    }
  }
});

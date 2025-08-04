export interface AlbionData {
  shopcategories: Shopcategories;
  hideoutitem: Hideoutitem;
  trackingitem: Trackingitem[];
  farmableitem: Farmableitem[];
  simpleitem: Simpleitem[];
  consumableitem: Consumableitem[];
  rewardtoken: Rewardtoken;
  consumablefrominventoryitem: Consumablefrominventoryitem[];
  trashitem: Trashitem[];
  equipmentitem: Equipmentitem[];
  weapon: Weapon[];
  mount: Mount[];
  furnitureitem: Furnitureitem[];
  mountskin: Mountskin[];
  // journalitem: Journalitem[];
  labourercontract: Labourercontract[];
  transformationweapon: Transformationweapon[];
  crystalleagueitem: Crystalleagueitem[];
  siegebanner: Siegebanner[];
  killtrophy: Killtrophy[];
}

export interface EnchantmentEntry {
  enchantmentlevel: string;
  itempower: string;
  durability: string;
  craftingrequirements: CraftResourceRequirements[];
  upgraderequirements?: {
    upgraderesource?: any;
  };
}

export interface Consumablefrominventoryitem {
  uniquename: string;
  tradable: string;
  consumeoncraft: string;
  uisprite: string;
  abilitypower: string;
  consumespell: string;
  shopcategory: string;
  shopsubcategory1: string;
  tier: string;
  weight: string;
  maxstacksize: string;
  unlockedtocraft: string;
  unlockedtouse: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  itemvalue: string;
  shopsubcategory2: string;
  craftingrequirements: CraftResourceRequirements[];
}

export interface Consumableitem {
  uniquename: string;
  itemvalue: string;
  fishingfame: string;
  fishingminigamesetting: string;
  descriptionlocatag: string;
  uisprite: string;
  nutrition: string;
  abilitypower: string;
  slottype: string;
  consumespell: string;
  shopcategory: string;
  shopsubcategory1: string;
  resourcetype: string;
  tier: string;
  weight: string;
  dummyitempower: string;
  maxstacksize: string;
  unlockedtocraft: string;
  unlockedtoequip: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  shopsubcategory2: string;
  shopsubcategory3: string;
}

export interface Crystalleagueitem {
  uniquename: string;
  uisprite: string;
  shopcategory: string;
  shopsubcategory1: string;
  tier: string;
  enchantmentlevel: string;
  resourcetype: string;
  weight: string;
  maxstacksize: string;
  namelocatag: string;
  descriptionlocatag: string;
  descvariable0: string;
  salvageable: string;
  itemvalue: string;
  tradable: string;
  unlockedtocraft: string;
  canbestoredinbattlevault: string;
  salvagevalueoverride: string;
  shopsubcategory2: string;
  shopsubcategory3: string;
  craftingrequirements: CraftResourceRequirements[];
}

export interface Equipmentitem {
  uniquename: string;
  uisprite: string;
  maxqualitylevel: string;
  abilitypower: string;
  slottype: string;
  itempowerprogressiontype: string;
  shopcategory: string;
  shopsubcategory1: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  skincount: string;
  tier: string;
  weight: string;
  activespellslots: string;
  passivespellslots: string;
  physicalarmor: string;
  magicresistance: string;
  durability: string;
  durabilityloss_attack: string;
  durabilityloss_spelluse: string;
  durabilityloss_receivedattack: string;
  durabilityloss_receivedspell: string;
  offhandanimationtype: string;
  unlockedtocraft: string;
  unlockedtoequip: string;
  hitpointsmax: string;
  hitpointsregenerationbonus: string;
  energymax: string;
  energyregenerationbonus: string;
  crowdcontrolresistance: string;
  itempower: string;
  physicalattackdamagebonus: string;
  magicattackdamagebonus: string;
  physicalspelldamagebonus: string;
  magicspelldamagebonus: string;
  healbonus: string;
  bonusccdurationvsplayers: string;
  bonusccdurationvsmobs: string;
  threatbonus: string;
  magiccooldownreduction: string;
  bonusdefensevsplayers: string;
  bonusdefensevsmobs: string;
  magiccasttimereduction: string;
  attackspeedbonus: string;
  movespeedbonus: string;
  healmodifier: string;
  canbeovercharged: string;
  showinmarketplace: string;
  energycostreduction: string;
  masterymodifier: string;
  shopsubcategory2: string;
  craftingrequirements: CraftResourceRequirements[];
}

export interface Farmableitem {
  uniquename: string;
  tier: string;
  placefame: string;
  pickupable: string;
  destroyable: string;
  unlockedtoplace: string;
  maxstacksize: string;
  shopcategory: string;
  shopsubcategory1: string;
  kind: string;
  weight: string;
  unlockedtocraft: string;
  animationid: string;
  activefarmfocuscost: string;
  activefarmmaxcycles: string;
  activefarmactiondurationseconds: string;
  activefarmcyclelengthseconds: string;
  activefarmbonus: string;
  itemvalue: string;
  shopsubcategory2: string;
  shopsubcategory3: string;
  craftingrequirements: Farmableitemcraftingrequirements;
  AudioInfo: Farmableitemaudioinfo;
  harvest: Farmableitemharvest;
}

export interface Farmableitemaudioinfo {
  name: string;
}

export interface Farmableitemcraftingrequirements {
  silver: string;
  time: string;
  swaptransaction: string;
}

export interface Farmableitemharvest {
  growtime: string;
  lootlist: string;
  lootchance: string;
  fame: string;
  seed: Farmableitemharvestseed;
}

export interface Farmableitemharvestseed {
  chance: string;
  amount: string;
}

export interface Furnitureitem {
  uniquename: string;
  shopcategory: string;
  shopsubcategory1: string;
  tier: string;
  durability: string;
  durabilitylossperdayfactor: string;
  weight: string;
  unlockedtocraft: string;
  placeableindoors: string;
  placeableoutdoors: string;
  placeableindungeons: string;
  placeableinexpeditions: string;
  accessrightspreset: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  craftingrequirements: CraftResourceRequirements[];
  AudioInfo: Furnitureitemaudioinfo;
  repairkit: Furnitureitemrepairkit;
}

export interface Furnitureitemaudioinfo {
  name: string;
}

export interface Furnitureitemrepairkit {
  repaircostfactor: string;
  maxtier: string;
}

export interface Hideoutitem {
  uniquename: string;
  itemvalue: string;
  tier: string;
  mindistance: string;
  mindistanceintunnel: string;
  placementduration: string;
  primetimedurationminutes: string;
  maxstacksize: string;
  weight: string;
  unlockedtocraft: string;
  shopcategory: string;
  shopsubcategory1: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  shopsubcategory2: string;
  craftingrequirements: CraftResourceRequirements[];
}

// export interface Journalitem {
//   salvageable: string;
//   uniquename: string;
//   tier: string;
//   maxfame: string;
//   baselootamount: string;
//   shopcategory: string;
//   shopsubcategory1: string;
//   weight: string;
//   unlockedtocraft: string;
//   fasttravelfactor: string;
//   shopsubcategory2: string;
//   shopsubcategory3: string;
//   craftingrequirements: CraftResourceWrapper;
// }

export interface Killtrophy {
  uniquename: string;
  expiretimedays: string;
  shopcategory: string;
  durabilitylossperdayfactor: string;
  shopsubcategory1: string;
  tier: string;
  weight: string;
  durability: string;
  unlockedtocraft: string;
  placeableindoors: string;
  placeableoutdoors: string;
  placeableindungeons: string;
  placeableinexpeditions: string;
  uisprite: string;
  descriptionlocatag: string;
  showinmarketplace: string;
  salvageable: string;
  customizewithguildlogo: string;
  itemvalue: string;
}

export interface Labourercontract {
  uniquename: string;
  tier: string;
  shopcategory: string;
  shopsubcategory1: string;
  unlockedtocraft: string;
  weight: string;
  shopsubcategory2: string;
  shopsubcategory3: string;
}

export interface Mount {
  uniquename: string;
  mountcategory: string;
  maxqualitylevel: string;
  itempower: string;
  abilitypower: string;
  slottype: string;
  shopcategory: string;
  shopsubcategory1: string;
  mountedbuff: string;
  halfmountedbuff: string;
  tier: string;
  weight: string;
  activespellslots: string;
  passivespellslots: string;
  durability: string;
  durabilityloss_attack: string;
  durabilityloss_spelluse: string;
  durabilityloss_receivedattack: string;
  durabilityloss_receivedspell: string;
  durabilityloss_receivedattack_mounted: string;
  durabilityloss_receivedspell_mounted: string;
  durabilityloss_mounting: string;
  unlockedtocraft: string;
  unlockedtoequip: string;
  mounttime: string;
  dismounttime: string;
  mounthitpointsmax: string;
  mounthitpointsregeneration: string;
  prefabname: string;
  prefabscaling: string;
  despawneffect: string;
  despawneffectscaling: string;
  remountdistance: string;
  halfmountrange: string;
  forceddismountcooldown: string;
  forceddismountspellcooldown: string;
  fulldismountcooldown: string;
  remounttime: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  dismountbuff: string;
  forceddismountbuff: string;
  hostiledismountbuff: string;
  longhostiledismountbuff: string;
  showinmarketplace: string;
  hidefromplayeroncontext: string;
  vfxAddonKeyword: string;
  shopsubcategory2: string;
  craftingrequirements: CraftResourceRequirements[];
  craftingspelllist: Mountcraftingspelllist;
  SocketPreset: Mountsocketpreset;
  AudioInfo: Mountaudioinfo;
  AssetVfxPreset: Mountassetvfxpreset;
  FootStepVfxPreset: Mountaudioinfo;
}

export interface Mountassetvfxpreset {
  name: string;
}

export interface Mountaudioinfo {
  name: string;
}

export interface Mountcraftingspelllist {
  craftspell: Mountcraftingspelllistcraftspell;
}

export interface Mountcraftingspelllistcraftspell {
  uniquename: string;
}

export interface Mountskin {
  uniquename: string;
  prefabname: string;
  prefabscaling: string;
  despawneffect: string;
  despawneffectscaling: string;
  vfxAddonKeyword: string;
  SocketPreset: Mountaudioinfo;
  AssetVfxPreset: Mountskinassetvfxpreset;
  AudioInfo: Mountaudioinfo;
  FootStepVfxPreset: Mountaudioinfo;
}

export interface Mountskinassetvfxpreset {
  name: string;
}

export interface Mountsocketpreset {
  name: string;
}

export interface Rewardtoken {
  uniquename: string;
  uisprite: string;
  shopcategory: string;
  uispriteoverlay1: string;
  shopsubcategory1: string;
  tier: string;
  resourcetype: string;
  unlockedtocraft: string;
  tradable: string;
  weight: string;
  maxstacksize: string;
  itemvalue: string;
  shopsubcategory2: string;
}

export interface Shopcategories {
  shopcategory: Shopcategoriesshopcategory[];
}

export interface Shopcategoriesshopcategory {
  id: string;
  value: string;
  shopsubcategory: Shopcategoriesshopcategoryshopsubcategory[];
}

export interface Shopcategoriesshopcategoryshopsubcategory {
  id: string;
  value: string;
  shopsubcategory2: Shopcategoriesshopcategoryshopsubcategoryshopsubcategory2[];
}

export interface Shopcategoriesshopcategoryshopsubcategoryshopsubcategory2 {
  id: string;
  value: string;
}

export interface Siegebanner {
  uniquename: string;
  referencespell: string;
  tradable: string;
  shopcategory: string;
  shopsubcategory1: string;
  tier: string;
  weight: string;
  maxstacksize: string;
  unlockedtocraft: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  canbeovercharged: string;
  shopsubcategory2: string;
  craftingrequirements: CraftResourceRequirements[];
}

export interface Simpleitem {
  uniquename: string;
  tier: string;
  weight: string;
  maxstacksize: string;
  uisprite: string;
  shopcategory: string;
  shopsubcategory1: string;
  unlockedtocraft: string;
  shopsubcategory2: string;
}

export interface Trackingitem {
  uniquename: string;
  uisprite: string;
  findtrackspell: string;
  trackingtimereduction: string;
  trackingfamebonus: string;
  durability: string;
  itempower: string;
  durabilityloss_inspecttrack: string;
  durabilityloss_findtrack: string;
  tier: string;
  craftingcategory: string;
  maxstacksize: string;
  weight: string;
  shopcategory: string;
  shopsubcategory1: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  slottype: string;
  passivespellslots: string;
  activespellslots: string;
  descriptionlocatag: string;
  durabilityloss_attack: string;
  durabilityloss_spelluse: string;
  durabilityloss_receivedattack: string;
  durabilityloss_receivedspell: string;
  unlockedtocraft: string;
  unlockedtoequip: string;
  abilitypower: string;
  canbeovercharged: string;
  shopsubcategory2: string;
  craftingrequirements: CraftResourceRequirements[];
}

export interface Transformationweapon {
  uniquename: string;
  transformation: string;
  mesh: string;
  uisprite: string;
  maxqualitylevel: string;
  abilitypower: string;
  physicalspelldamagebonus: string;
  magicspelldamagebonus: string;
  slottype: string;
  shopcategory: string;
  shopsubcategory1: string;
  attacktype: string;
  mainhandanimationtype: string;
  attackdamage: string;
  attackspeed: string;
  attackrange: string;
  twohanded: string;
  tier: string;
  weight: string;
  activespellslots: string;
  passivespellslots: string;
  durability: string;
  durabilityloss_attack: string;
  durabilityloss_spelluse: string;
  durabilityloss_receivedattack: string;
  durabilityloss_receivedspell: string;
  fxbonename: string;
  fxboneoffset: string;
  unlockedtocraft: string;
  unlockedtoequip: string;
  hitpointsmax: string;
  itempower: string;
  hitpointsregenerationbonus: string;
  itempowerprogressiontype: string;
  focusfireprotectionpenetration: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  craftingcategory: string;
  healmodifier: string;
  canbeovercharged: string;
  masterymodifier: string;
  physicalattackdamagebonus: string;
  magicattackdamagebonus: string;
  descriptionlocatag: string;
  shopsubcategory2: string;
  attackvariations: Transformationweaponattackvariations;
  projectile: Transformationweaponprojectile;
  SocketPreset: Transformationweaponsocketpreset;
  craftingrequirements: CraftResourceRequirements[];
  craftingspelllist: Transformationweaponcraftingspelllist;
  AudioInfo: Transformationweaponaudioinfo;
}

export interface Transformationweaponattackvariations {
  attackchaintime: string;
  attack: Transformationweaponattackvariationsattack[];
}

export interface Transformationweaponattackvariationsattack {
  attacktype: string;
  attackdamagefactor: string;
  attackdamagetimefactor: string;
  attackspeedfactor: string;
}

export interface Transformationweaponaudioinfo {
  name: string;
}

export interface Transformationweaponcraftingspelllist {
  craftspell: Transformationweaponcraftingspelllistcraftspell[];
}

export interface Transformationweaponcraftingspelllistcraftspell {
  uniquename: string;
  slots: string;
}

export interface Transformationweaponprojectile {
  prefab: string;
  startsocket: string;
  hitsocket: string;
  flyspeed: string;
  impactvfx: Transformationweaponprojectileimpactvfx;
}

export interface Transformationweaponprojectileimpactvfx {
  prefab: string;
  impactsocket: string;
}

export interface Transformationweaponsocketpreset {
  name: string;
}

export interface Trashitem {
  uniquename: string;
  shopcategory: string;
  shopsubcategory1: string;
  tier: string;
  weight: string;
  maxstacksize: string;
  estimatedmarketvalueoverride: string;
  showinmarketplace: string;
}

export interface Weapon {
  uniquename: string;
  mesh: string;
  uisprite: string;
  maxqualitylevel: string;
  abilitypower: string;
  slottype: string;
  shopcategory: string;
  shopsubcategory1: string;
  attacktype: string;
  attackdamage: string;
  attackspeed: string;
  attackrange: string;
  twohanded: string;
  tier: string;
  weight: string;
  activespellslots: string;
  passivespellslots: string;
  durability: string;
  durabilityloss_attack: string;
  durabilityloss_spelluse: string;
  durabilityloss_receivedattack: string;
  durabilityloss_receivedspell: string;
  mainhandanimationtype: string;
  unlockedtocraft: string;
  unlockedtoequip: string;
  itempower: string;
  unequipincombat: string;
  uicraftsoundstart: string;
  uicraftsoundfinish: string;
  canbeovercharged: string;
  shopsubcategory2: string;
  enchantments?: {
    enchantment: EnchantmentEntry[]
  };
  canharvest: Weaponcanharvest;
  craftingrequirements: CraftResourceRequirements[];
  AudioInfo: Weaponaudioinfo;
  SocketPreset: Weaponaudioinfo;
}

export interface Weaponaudioinfo {
  name: string;
}

export interface Weaponcanharvest {
  resourcetype: string;
}

export interface CraftResourceRequirements {
  silver: string;
  time: string;
  craftingfocus: string;
  craftresource: CraftResource[];
}

export interface CraftResource {
  uniquename: string;
  count: string;
  enchantmentlevel?: string;
}

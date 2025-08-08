export enum PriceType {
  SellMin = 'sell_price_min',
  SellMax = 'sell_price_max',
  BuyMin = 'buy_price_min',
  BuyMax = 'buy_price_max',
}

export enum City {
  FortSterling = 'Fort Sterling',
  Thetford = 'Thetford',
  Martlock = 'Martlock',
  Bridgewatch = 'Bridgewatch',
  Lymhurst = 'Lymhurst',
  BlackMarket = 'Black Market',
  // Brecilien = 'Brecilien',
}



export const cityColors: Record<City, string> = {
  // [City.Brecilien]: '#8e9be8',
  [City.BlackMarket]: '#323232',
  [City.Thetford]: '#924b8c',
  [City.FortSterling]: '#e6e3e1',
  [City.Lymhurst]: '#c3cc4c',
  [City.Bridgewatch]: '#db822c',
  [City.Martlock]: '#a0b5cb',
};

export enum ItemQuality {
  Normal = 1,
  Good,
  Outstanding,
  Excellent,
  Masterpiece,
}

export interface PriceEntry {
  item_id: string;
  city: City;
  quality: ItemQuality;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

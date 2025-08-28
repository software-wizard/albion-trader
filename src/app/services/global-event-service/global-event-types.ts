import {City} from "../../data-types/albion-price-data";

export enum GlobalEventType {
  RESOURCES_CITY_CHANGED = 'RESOURCES_CITY_CHANGED',
  ITEMS_CITY_CHANGED = 'ITEMS_CITY_CHANGED',
  RRR_CHANGED = 'RRR_CHANGED'
}

export interface GlobalEventData {
  [GlobalEventType.RESOURCES_CITY_CHANGED]: { city: City };
  [GlobalEventType.ITEMS_CITY_CHANGED]: { city: City };
  [GlobalEventType.RRR_CHANGED]: { value: number };
}

import {Component, effect, signal, untracked} from '@angular/core';
import {CommonModule} from '@angular/common';
import {City} from "../../../data-types/albion-price-data";
import {DropdownComponent, DropdownOption} from "../../atoms/dropdown/dropdown.component";
import {GlobalEventService} from "../../../services/global-event-service/global-event-service";
import {GlobalEventType} from "../../../services/global-event-service/global-event-types";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  rrrValueSignal = signal(47.9);
  resourcesPriceSignal = signal(City.Thetford);
  itemPriceSignal = signal(City.Thetford);

  private init = {
    rrr: true,
    res: true,
    items: true,
  };

  constructor(private eventService: GlobalEventService) {
    eventService.emit(GlobalEventType.RRR_CHANGED, {value: this.rrrValueSignal()});
    let resValue = this.resourcesPriceSignal();
    let itemValue = this.itemPriceSignal();
    eventService.emit(GlobalEventType.ITEMS_CITY_CHANGED, {city: itemValue});
    eventService.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city: resValue});

    effect(() => {
      const v = this.rrrValueSignal();
      if (this.init.rrr) {
        this.init.rrr = false;
        return;
      }
      untracked(() => eventService.emit(GlobalEventType.RRR_CHANGED, {value: v}));
    });

    effect(() => {
      const c = this.resourcesPriceSignal();
      if (this.init.res) {
        this.init.res = false;
        return;
      }
      untracked(() => eventService.emit(GlobalEventType.RESOURCES_CITY_CHANGED, {city: c}));
    });

    effect(() => {
      const c = this.itemPriceSignal();
      if (this.init.items) {
        this.init.items = false;
        return;
      }
      untracked(() => eventService.emit(GlobalEventType.ITEMS_CITY_CHANGED, {city: c}));
    });
  }

  readonly focusOptions: DropdownOption[] = [
    {value: 43.5, label: '43.5%'},
    {value: 46.5, label: '46.5%'},
    {value: 49.2, label: '49.2%'},
    {value: 47.9, label: '47.9%'},
    {value: 50.5, label: '50.5%'},
    {value: 52.8, label: '52.8%'}
  ];

  readonly cityOptions: DropdownOption[] = [
    {value: City.FortSterling, label: 'Fort Sterling'},
    {value: City.Lymhurst, label: 'Lymhurst'},
    {value: City.Bridgewatch, label: 'Bridgewatch'},
    {value: City.Martlock, label: 'Martlock'},
    {value: City.Thetford, label: 'Thetford'},
    {value: City.BlackMarket, label: 'Black Market'}
  ];
}

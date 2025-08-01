import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OreRefiningMockService, ApiPriceEntry } from '../../services/ore-refining-mock.service';

@Component({
  selector: 'app-refining-ore-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './refining-ore-table.component.html'
})
export class RefiningOreTableComponent implements OnInit {
  prices: ApiPriceEntry[] = [];
  private service = inject(OreRefiningMockService);

  ngOnInit() {
    this.service.getOrePrices().subscribe(data => this.prices = data);
  }
}

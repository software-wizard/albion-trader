import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {model} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() displayOnly = false;
  value = model<number>(0);

  onBlur(e: Event) {
    if (this.displayOnly) return;
    const el = e.target as HTMLInputElement;
    const parsed = this.parseValue(el.value);
    if (parsed !== this.value()) this.value.set(parsed);
    el.value = this.formatValue(this.value());
  }

  increase() {
    if (this.displayOnly) return;
    this.value.set(this.value() + this.getVisibleDigitStep(this.value()));
  }

  decrease() {
    if (this.displayOnly) return;
    this.value.set(Math.max(0, this.value() - this.getVisibleDigitStep(this.value())));
  }

  private getVisibleDigitStep(val: number): number {
    if (val < 1_000) return 1;
    if (val < 10_000) return 10;
    if (val < 100_000) return 100;
    if (val < 1_000_000) return 1_000;
    if (val < 10_000_000) return 10_000;
    if (val < 100_000_000) return 100_000;
    return 1_000_000;
  }

  private parseValue(str: string): number {
    const m = str.trim().toLowerCase().match(/^([\d.,]+)\s*([km]?)$/);
    if (!m) return this.value();
    const num = parseFloat(m[1].replace(',', '.'));
    if (isNaN(num)) return this.value();
    const u = m[2];
    if (u === 'k') return Math.round(num * 1_000);
    if (u === 'm') return Math.round(num * 1_000_000);
    return Math.round(num);
  }

  formatValue(val: number): string {
    if (val < 1_000) return val.toString();
    if (val < 10_000) return (val / 1_000).toFixed(2).replace(/\.?0+$/, '') + 'k';
    if (val < 100_000) return (val / 1_000).toFixed(1).replace(/\.?0+$/, '') + 'k';
    if (val < 1_000_000) return Math.round(val / 1_000) + 'k';
    if (val < 10_000_000) return (val / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'm';
    if (val < 100_000_000) return (val / 1_000_000).toFixed(1).replace(/\.?0+$/, '') + 'm';
    return Math.round(val / 1_000_000) + 'm';
  }
}

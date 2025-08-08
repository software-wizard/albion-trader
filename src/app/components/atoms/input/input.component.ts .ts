import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent {
    @Input() value = 0;
    inputText = '';

    ngOnChanges(): void {
        this.syncInputText();
    }

    onBlur(): void {
        const parsed = this.parseValue(this.inputText);
        if (parsed !== this.value) {
            this.value = parsed;
            this.syncInputText();
        }
    }

    increase(): void {
        this.value += this.getVisibleDigitStep(this.value);
        this.syncInputText();
    }

    decrease(): void {
        this.value = Math.max(0, this.value - this.getVisibleDigitStep(this.value));
        this.syncInputText();
    }

    private syncInputText(): void {
        this.inputText = this.formatValue(this.value);
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
        const match = str.trim().toLowerCase().match(/^([\d.,]+)\s*([km]?)$/);
        if (!match) return this.value;

        const num = parseFloat(match[1].replace(',', '.'));
        const unit = match[2];

        if (isNaN(num)) return this.value;

        switch (unit) {
            case 'k':
                return Math.round(num * 1_000);
            case 'm':
                return Math.round(num * 1_000_000);
            default:
                return Math.round(num);
        }
    }

    private formatValue(val: number): string {
        if (val < 1_000) return val.toString();
        if (val < 10_000) return (val / 1_000).toFixed(2).replace(/\.?0+$/, '') + 'k';
        if (val < 100_000) return (val / 1_000).toFixed(1).replace(/\.?0+$/, '') + 'k';
        if (val < 1_000_000) return Math.round(val / 1_000) + 'k';
        if (val < 10_000_000) return (val / 1_000_000).toFixed(2).replace(/\.?0+$/, '') + 'm';
        if (val < 100_000_000) return (val / 1_000_000).toFixed(1).replace(/\.?0+$/, '') + 'm';
        return Math.round(val / 1_000_000) + 'm';
    }
}

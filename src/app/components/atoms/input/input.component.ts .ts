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

    ngOnInit(): void {
        this.syncInputText();
    }

    syncInputText(): void {
        this.inputText = this.formatValue(this.value);
    }

    onBlur(): void {
        this.value = this.parseValue(this.inputText);
        this.syncInputText();
    }

    increase(): void {
        this.value += this.getVisibleDigitStep(this.value);
        this.syncInputText();
    }

    decrease(): void {
        this.value = Math.max(0, this.value - this.getVisibleDigitStep(this.value));
        this.syncInputText();
    }

    private getVisibleDigitStep(val: number): number {
        if (val < 1_000) return 1;
        if (val < 10_000) return 10; // 1.23k → 1.24k
        if (val < 100_000) return 100; // 12.3k → 12.4k
        if (val < 1_000_000) return 1_000; // 123k → 124k
        if (val < 10_000_000) return 10_000; // 1.23m → 1.24m
        if (val < 100_000_000) return 100_000; // 12.3m → 12.4m
        return 1_000_000; // 123m → 124m
    }

    private parseValue(str: string): number {
        const match = str.trim().toLowerCase().match(/^([\d.,]+)\s*([km]?)$/);
        if (!match) return 0;

        const num = parseFloat(match[1].replace(',', '.'));
        const unit = match[2];

        if (isNaN(num)) return 0;

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

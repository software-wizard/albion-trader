import {Component, Input, WritableSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

export interface DropdownOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() options: DropdownOption[] = [];
  @Input() valueSignal!: WritableSignal<any>;
  @Input() placeholder: string = '';

  onSelectionChange(selectedValue: any): void {
    this.valueSignal.set(selectedValue);
  }
}

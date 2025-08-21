import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

export enum SeparatorStyle {
  DASH = 'dash',
  NORMAL = 'normal',
  BOLD = 'bold'
}

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
})
export class SeparatorComponent {
  @Input() style: SeparatorStyle = SeparatorStyle.DASH;

}

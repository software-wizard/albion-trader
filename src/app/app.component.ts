import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {RefiningOreTableComponent} from "./components/refining-ore-table/refining-ore-table.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RefiningOreTableComponent, MainPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'albion-trader';
}

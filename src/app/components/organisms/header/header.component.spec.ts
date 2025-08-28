import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {signal} from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.rrrValueSignal = signal(47.9);
    component.itemPriceSignal = signal(null);
    component.resourcesPriceSignal = signal(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default focus value', () => {
    expect(component.rrrValueSignal()).toBe(47.9);
  });
});

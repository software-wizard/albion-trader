import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {signal} from '@angular/core';
import {DropdownComponent} from "./dropdown.component.ts ";

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.valueSignal = signal(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update signal when selection changes', () => {
    const testValue = 'test-value';
    component.onSelectionChange(testValue);

    expect(component.valueSignal()).toBe(testValue);
  });

  it('should display correct label', () => {
    const testLabel = 'Test Label';
    component.label = testLabel;
    fixture.detectChanges();

    const labelElement = fixture.nativeElement.querySelector('mat-label');
    expect(labelElement.textContent).toBe(testLabel);
  });
});

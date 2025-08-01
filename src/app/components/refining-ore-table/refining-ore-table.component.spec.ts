import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefiningOreTableComponent } from './refining-ore-table.component';

describe('RefiningOreTableComponent', () => {
  let component: RefiningOreTableComponent;
  let fixture: ComponentFixture<RefiningOreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefiningOreTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefiningOreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

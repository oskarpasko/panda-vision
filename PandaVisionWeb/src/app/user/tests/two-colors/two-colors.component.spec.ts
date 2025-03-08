import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoColorsComponent } from './two-colors.component';

describe('TwoColorsComponent', () => {
  let component: TwoColorsComponent;
  let fixture: ComponentFixture<TwoColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwoColorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

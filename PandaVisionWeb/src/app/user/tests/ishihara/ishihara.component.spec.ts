import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IshiharaComponent } from './ishihara.component';

describe('IshiharaComponent', () => {
  let component: IshiharaComponent;
  let fixture: ComponentFixture<IshiharaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IshiharaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IshiharaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

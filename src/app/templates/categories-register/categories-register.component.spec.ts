import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesRegisterComponent } from './categories-register.component';

describe('CategoriesRegisterComponent', () => {
  let component: CategoriesRegisterComponent;
  let fixture: ComponentFixture<CategoriesRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

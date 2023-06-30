import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployeesComponent } from './login-employees.component';

describe('LoginEmployeesComponent', () => {
  let component: LoginEmployeesComponent;
  let fixture: ComponentFixture<LoginEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginEmployeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

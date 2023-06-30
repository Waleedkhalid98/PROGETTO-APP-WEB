import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordPagesComponent } from './dashbord-pages.component';

describe('DashbordPagesComponent', () => {
  let component: DashbordPagesComponent;
  let fixture: ComponentFixture<DashbordPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

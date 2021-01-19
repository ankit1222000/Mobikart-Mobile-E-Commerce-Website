import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDashComponent } from './admin-order-dash.component';

describe('AdminOrderDashComponent', () => {
  let component: AdminOrderDashComponent;
  let fixture: ComponentFixture<AdminOrderDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

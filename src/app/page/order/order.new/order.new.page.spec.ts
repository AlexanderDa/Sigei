import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNewPage } from './order.new.page';

describe('OrderNewPage', () => {
  let component: OrderNewPage;
  let fixture: ComponentFixture<OrderNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

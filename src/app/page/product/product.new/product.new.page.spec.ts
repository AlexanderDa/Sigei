import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductNewPage } from './product.new.page';

describe('ProductNewPage', () => {
  let component: ProductNewPage;
  let fixture: ComponentFixture<ProductNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

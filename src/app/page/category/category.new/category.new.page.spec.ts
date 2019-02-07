import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNewPage } from './category.new.page';

describe('CategoryNewPage', () => {
  let component: CategoryNewPage;
  let fixture: ComponentFixture<CategoryNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

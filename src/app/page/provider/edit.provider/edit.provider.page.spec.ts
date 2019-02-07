import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProviderPage } from './edit.provider.page';

describe('EditProviderPage', () => {
  let component: EditProviderPage;
  let fixture: ComponentFixture<EditProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

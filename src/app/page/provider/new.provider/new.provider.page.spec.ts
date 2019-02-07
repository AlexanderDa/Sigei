import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProviderPage } from './new.provider.page';

describe('NewProviderPage', () => {
  let component: NewProviderPage;
  let fixture: ComponentFixture<NewProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
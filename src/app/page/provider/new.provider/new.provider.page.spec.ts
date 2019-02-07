import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPage } from './new.provider.page';

describe('ProviderPage', () => {
  let component: ProviderPage;
  let fixture: ComponentFixture<ProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

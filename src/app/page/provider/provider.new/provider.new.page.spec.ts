import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderNewPage } from './provider.new.page';

describe('ProviderNewPage', () => {
  let component: ProviderNewPage;
  let fixture: ComponentFixture<ProviderNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

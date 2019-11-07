import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WforecastPage } from './wforecast.page';

describe('WforecastPage', () => {
  let component: WforecastPage;
  let fixture: ComponentFixture<WforecastPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WforecastPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WforecastPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

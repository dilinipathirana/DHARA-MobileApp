import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeRoutePage } from './safe-route.page';

describe('SafeRoutePage', () => {
  let component: SafeRoutePage;
  let fixture: ComponentFixture<SafeRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafeRoutePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

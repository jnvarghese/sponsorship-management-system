import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollSponseeComponent } from './enroll-sponsee.component';

describe('EnrollSponseeComponent', () => {
  let component: EnrollSponseeComponent;
  let fixture: ComponentFixture<EnrollSponseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollSponseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollSponseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

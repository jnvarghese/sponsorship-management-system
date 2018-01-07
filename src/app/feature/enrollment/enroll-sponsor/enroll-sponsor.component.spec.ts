import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollSponsorComponent } from './enroll-sponsor.component';

describe('EnrollSponsorComponent', () => {
  let component: EnrollSponsorComponent;
  let fixture: ComponentFixture<EnrollSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

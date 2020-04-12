import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredSponsorshipComponent } from './expired-sponsorship.component';

describe('ExpiredSponsorshipComponent', () => {
  let component: ExpiredSponsorshipComponent;
  let fixture: ComponentFixture<ExpiredSponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredSponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredSponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

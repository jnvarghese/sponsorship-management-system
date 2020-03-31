import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseSponsorshipComponent } from './release-sponsorship.component';

describe('ReleaseSponsorshipComponent', () => {
  let component: ReleaseSponsorshipComponent;
  let fixture: ComponentFixture<ReleaseSponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseSponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseSponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

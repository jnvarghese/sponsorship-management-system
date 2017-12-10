import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { sponsorDetailComponent } from './sponsor-detail.component';

describe('sponsorDetailComponent', () => {
  let component: sponsorDetailComponent;
  let fixture: ComponentFixture<sponsorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ sponsorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(sponsorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

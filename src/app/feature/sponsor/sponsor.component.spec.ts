import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { sponsorComponent } from './sponsor.component';

describe('sponsorComponent', () => {
  let component: sponsorComponent;
  let fixture: ComponentFixture<sponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ sponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(sponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

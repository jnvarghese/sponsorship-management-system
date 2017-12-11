import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorActionComponent } from './sponsor-action.component';

describe('SponsorActionComponent', () => {
  let component: SponsorActionComponent;
  let fixture: ComponentFixture<SponsorActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

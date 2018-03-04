import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SponsorDetailComponent } from '..';

describe('sponsorDetailComponent', () => {
  let component: SponsorDetailComponent;
  let fixture: ComponentFixture<SponsorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

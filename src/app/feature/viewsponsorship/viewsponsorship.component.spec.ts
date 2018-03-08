import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsponsorshipComponent } from './viewsponsorship.component';

describe('ViewsponsorshipComponent', () => {
  let component: ViewsponsorshipComponent;
  let fixture: ComponentFixture<ViewsponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagesponsorshipComponent } from './managesponsorship.component';

describe('ManagesponsorshipComponent', () => {
  let component: ManagesponsorshipComponent;
  let fixture: ComponentFixture<ManagesponsorshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagesponsorshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagesponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyDetailComponent } from './agency-detail.component';

describe('AgencyDetailComponent', () => {
  let component: AgencyDetailComponent;
  let fixture: ComponentFixture<AgencyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

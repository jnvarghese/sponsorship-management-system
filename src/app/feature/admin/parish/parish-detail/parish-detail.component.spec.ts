import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishDetailComponent } from './parish-detail.component';

describe('ParishDetailComponent', () => {
  let component: ParishDetailComponent;
  let fixture: ComponentFixture<ParishDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParishDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

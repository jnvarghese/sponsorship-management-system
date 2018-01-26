import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParishprojectassignComponent } from './parishprojectassign.component';

describe('ParishprojectassignComponent', () => {
  let component: ParishprojectassignComponent;
  let fixture: ComponentFixture<ParishprojectassignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParishprojectassignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParishprojectassignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

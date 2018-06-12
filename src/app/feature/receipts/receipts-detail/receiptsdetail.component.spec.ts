import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptsdetailComponent } from './receiptsdetail.component';

describe('ReceiptsdetailComponent', () => {
  let component: ReceiptsdetailComponent;
  let fixture: ComponentFixture<ReceiptsdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptsdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptsdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

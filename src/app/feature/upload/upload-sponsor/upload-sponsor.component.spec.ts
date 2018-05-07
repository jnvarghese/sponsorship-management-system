import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSponsorComponent } from './upload-sponsor.component';

describe('UploadSponsorComponent', () => {
  let component: UploadSponsorComponent;
  let fixture: ComponentFixture<UploadSponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

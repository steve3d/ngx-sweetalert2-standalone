import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwalPortalComponent } from './swal-portal.component';

describe('SwalPortalComponent', () => {
  let component: SwalPortalComponent;
  let fixture: ComponentFixture<SwalPortalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwalPortalComponent]
    });
    fixture = TestBed.createComponent(SwalPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwalComponent } from './swal.component';

describe('SwalComponent', () => {
  let component: SwalComponent;
  let fixture: ComponentFixture<SwalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwalComponent]
    });
    fixture = TestBed.createComponent(SwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

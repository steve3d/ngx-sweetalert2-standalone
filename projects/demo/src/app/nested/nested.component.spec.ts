import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedComponent } from './nested.component';

describe('NestedComponent', () => {
  let component: NestedComponent;
  let fixture: ComponentFixture<NestedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NestedComponent]
    });
    fixture = TestBed.createComponent(NestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

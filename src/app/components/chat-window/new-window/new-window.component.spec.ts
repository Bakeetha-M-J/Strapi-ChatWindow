import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWindowComponent } from './new-window.component';

describe('NewWindowComponent', () => {
  let component: NewWindowComponent;
  let fixture: ComponentFixture<NewWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewWindowComponent]
    });
    fixture = TestBed.createComponent(NewWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

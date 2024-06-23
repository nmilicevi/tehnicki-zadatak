import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccSelectDialogComponent } from './acc-select-dialog.component';

describe('AccSelectDialogComponent', () => {
  let component: AccSelectDialogComponent;
  let fixture: ComponentFixture<AccSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccSelectDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsComponent } from './guests.component';

describe('GuestsComponent', () => {
  let component: GuestsComponent;
  let fixture: ComponentFixture<GuestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestsComponent]
    });
    fixture = TestBed.createComponent(GuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

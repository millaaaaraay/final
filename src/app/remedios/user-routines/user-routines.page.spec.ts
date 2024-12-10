import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRoutinesPage } from './user-routines.page';

describe('UserRoutinesPage', () => {
  let component: UserRoutinesPage;
  let fixture: ComponentFixture<UserRoutinesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoutinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutinasAddPage } from './rutinas-add.page';

describe('RutinasAddPage', () => {
  let component: RutinasAddPage;
  let fixture: ComponentFixture<RutinasAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinasAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

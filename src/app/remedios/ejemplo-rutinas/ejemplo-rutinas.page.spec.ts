import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EjemploRutinasPage } from './ejemplo-rutinas.page';

describe('EjemploRutinasPage', () => {
  let component: EjemploRutinasPage;
  let fixture: ComponentFixture<EjemploRutinasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EjemploRutinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

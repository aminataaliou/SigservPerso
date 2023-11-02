import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteDaccesComponent } from './compte-dacces.component';

describe('CompteDaccesComponent', () => {
  let component: CompteDaccesComponent;
  let fixture: ComponentFixture<CompteDaccesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompteDaccesComponent]
    });
    fixture = TestBed.createComponent(CompteDaccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitucionalPage } from './institucional.page';

describe('InstitucionalPage', () => {
  let component: InstitucionalPage;
  let fixture: ComponentFixture<InstitucionalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InstitucionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

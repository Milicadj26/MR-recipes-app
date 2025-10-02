import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInPage } from './login.page';

describe('LoginPage', () => {
  let component: LogInPage;
  let fixture: ComponentFixture<LogInPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { MainNavigationComponent } from './main-navigation.component';

describe('MainNavigationComponent', () => {
  let component: MainNavigationComponent;
  let fixture: ComponentFixture<MainNavigationComponent>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthenticationService = jasmine.createSpyObj(
      'AuthenticationService',
      ['logout'],
      { isLoggedIn: true }
    );
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [MainNavigationComponent],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('should navigate to /login', () => {
      mockAuthenticationService.logout.and.returnValue(
        of(true).pipe(
          finalize(() => {
            expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
          })
        )
      );
      component.logout();
    });

    it('should not navigate at all', () => {
      mockAuthenticationService.logout.and.returnValue(
        of(false).pipe(
          finalize(() => {
            expect(mockRouter.navigate).not.toHaveBeenCalled();
          })
        )
      );
      component.logout();
    });
  });

  it('should return authentication state', () => {
    expect(component.isLoggedIn()).toBeTrue();
  });
});

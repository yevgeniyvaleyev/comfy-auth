import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService', [
      'login',
    ], { isLoggedIn: true });
    mockRouter = jasmine.createSpyObj('Router', [
      'navigate',
    ]);
    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        queryParamMap: {
          get: () => 'fake_target_url'
        }
      }
    });
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home on onInit phase when logged in', () => {
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  describe('email', () => {
    it('should return entered email', () => {
      expect(component.email?.value).toEqual('');
      component.form.controls.email.setValue('a@a.com');
      expect(component.email?.value).toEqual('a@a.com');
    });

    it('should validate email', () => {
      component.form.controls.email.setValue('');
      expect(component.form.controls.email.valid).toBeFalsy();
      component.form.controls.email.setValue('@sd.com');
      expect(component.form.controls.email.valid).toBeFalsy();
      component.form.controls.email.setValue('.a@sd.com');
      expect(component.form.controls.email.valid).toBeFalsy();

      component.form.controls.email.setValue('a.a@sd.com');
      expect(component.form.controls.email.valid).toBeTruthy();
    });
  });

  describe('password', () => {
    it('should return entered password', () => {
      expect(component.password?.value).toEqual('');
      component.form.controls.password.setValue('Xyzqw');
      expect(component.password?.value).toEqual('Xyzqw');
    });

    it('should validate login password', () => {
      component.form.controls.password.setValue('');
      expect(component.form.controls.password.valid).toBeFalsy();

      component.form.controls.password.setValue('r@nd0m_tExt');
      expect(component.form.controls.password.valid).toBeTruthy();
    });
  });

  describe('login', () => {
    const fakeEvent = {
      preventDefault: () => {}
    } as Event;

    beforeEach(() => {
      mockRouter.navigate.calls.reset();
    })

    it('should navigate to target url', () => {
      mockAuthenticationService.login.and.returnValue(of(true));
      component.login(fakeEvent);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['fake_target_url']);
    });

    it('should not navigate to target url', () => {
      mockAuthenticationService.login.and.returnValue(of(false));
      component.login(fakeEvent);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  })
});

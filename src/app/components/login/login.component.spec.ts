import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    mockAuthenticationService = jasmine.createSpyObj(
      'AuthenticationService',
      ['login'],
      { isLoggedIn: true }
    );
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        queryParamMap: {
          get: () => 'fake_target_url',
        },
      },
    });
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
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
    beforeEach(() => {
      // Setting password field in valid state
      component.form.controls.email.setValue('a@a.com');
      // verifying the field is valid
      expect(component.form.controls.email.invalid).toBeFalse();
    });

    it('should return entered email', () => {
      component.form.controls.email.setValue('a@a.com');
      expect(component.email?.value).toEqual('a@a.com');
    });

    it('should fail if email is empty', () => {
      component.form.controls.email.setValue('');
      expect(component.form.controls.email.hasError('required')).toBeTrue();
    });

    it('should fail if email is not correct', () => {
      component.form.controls.email.setValue('@sd.com');
      expect(component.form.controls.email.hasError('correctEmail')).toBeTrue();
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
    beforeEach(() => {
      mockRouter.navigate.calls.reset();
    });

    it('should navigate to target url', (done) => {
      component.form = {
        invalid: false,
        setErrors(args: any) {},
      } as FormGroup;
      spyOn(component.form, 'setErrors');

      mockAuthenticationService.login.and.returnValue(
        of(true).pipe(
          finalize(() => {
            expect(mockRouter.navigate).toHaveBeenCalledWith([
              'fake_target_url',
            ]);
            expect(component.form.setErrors).toHaveBeenCalledWith(null);
            done();
          })
        )
      );
      component.login();
    });

    it('should not navigate to target url', (done) => {
      component.form = {
        invalid: false,
        setErrors(args: any) {},
      } as FormGroup;
      spyOn(component.form, 'setErrors');

      mockAuthenticationService.login.and.returnValue(
        of(false).pipe(finalize(() => {
          expect(component.form.setErrors).toHaveBeenCalledWith({
            loginFailed: true,
          });
          expect(mockRouter.navigate).not.toHaveBeenCalled();
          done();
        }))
      );
      component.login();
    });

    it('should return undefined if form is invalid', () => {
      component.form = {
        invalid: true,
      } as FormGroup;
      expect(component.login()).toBeUndefined();
    });
  });
});

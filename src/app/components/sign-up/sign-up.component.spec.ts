import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SignUpResponseData } from 'src/app/types';
import { UserValidators } from 'src/app/validators/user.validator';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockUserValidators: jasmine.SpyObj<UserValidators>;

  beforeEach(async () => {
    mockAuthenticationService = jasmine.createSpyObj(
      'AuthenticationService',
      ['signUp'],
      { isLoggedIn: true }
    );
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockUserValidators = jasmine.createSpyObj('UserValidators', [
      'isUniqueEmail',
    ]);
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
        { provide: UserValidators, useValue: mockUserValidators },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
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

    it('should fail if email is not unique', () => {
      mockUserValidators.isUniqueEmail.and.returnValue(() =>
        of({ isUniqueEmail: true })
      );
      component.form.controls.email.clearAsyncValidators();
      component.form.controls.email.setAsyncValidators(mockUserValidators.isUniqueEmail())
      component.form.controls.email.setValue('a.a@sd.com');
      expect(component.form.controls.email.hasError('isUniqueEmail')).toBeTrue();
    });
  });

  describe('password', () => {
    beforeEach(() => {
      // Setting password field in valid state
      component.form.controls.lastName.setValue('Bakker');
      component.form.controls.firstName.setValue('Bob');
      component.form.controls.password.setValue('ValidPassword');
      // verifying the field is valid
      expect(component.form.controls.password.invalid).toBeFalse();
    });

    it('should return entered password', () => {
      component.form.controls.password.setValue('Xyzqw');
      expect(component.password?.value).toEqual('Xyzqw');
    });

    it('should fail if password is too short', () => {
      component.form.controls.password.setValue('Asdd');
      expect(component.form.controls.password.hasError('minlength')).toBeTrue();
    });

    it('should fail if password does not have lowercase letters', () => {
      component.form.controls.password.setValue('AAAAAAAAAAAA');
      expect(
        component.form.controls.password.hasError('smallLetters')
      ).toBeTrue();
    });

    it('should fail if password does not have uppercase letters', () => {
      component.form.controls.password.setValue('aaaaaaaaa');
      expect(
        component.form.controls.password.hasError('capitalLetters')
      ).toBeTrue();
    });

    it('should fail if password is empty', () => {
      component.form.controls.password.setValue('');
      expect(component.form.controls.password.hasError('required')).toBeTrue();
    });

    it('should validate password which contains first name', () => {
      component.form.controls.password.setValue('---Sam---');
      component.form.controls.firstName.setValue('Sam');
      expect(
        component.form.controls.password.hasError('containsFirstName')
      ).toBeTrue();
    });

    it('should validate password which contains last name', () => {
      component.form.controls.password.setValue('---Baker---');
      component.form.controls.lastName.setValue('Baker');
      expect(
        component.form.controls.password.hasError('containsLastName')
      ).toBeTrue();
    });
  });

  describe('firstName', () => {
    it('should return entered first name', () => {
      expect(component.firstName?.value).toEqual('');
      component.form.controls.firstName.setValue('Sam');
      expect(component.firstName?.value).toEqual('Sam');
    });

    it('should fail if firstName is empty', () => {
      component.form.controls.firstName.setValue('');
      expect(component.form.controls.firstName.hasError('required')).toBeTrue();
    });

    it('should fail if firstName is too short', () => {
      component.form.controls.firstName.setValue('A');
      expect(component.form.controls.firstName.hasError('minlength')).toBeTrue();
    });

    it('should fail if firstName has incorrect structure', () => {
      component.form.controls.firstName.setValue('bakker');
      expect(component.form.controls.firstName.hasError('correctName')).toBeTrue();
    });
  });

  describe('lastName', () => {
    it('should fail if lastName is empty', () => {
      component.form.controls.lastName.setValue('');
      expect(component.form.controls.lastName.hasError('required')).toBeTrue();
    });

    it('should fail if lastName is too short', () => {
      component.form.controls.lastName.setValue('A');
      expect(component.form.controls.lastName.hasError('minlength')).toBeTrue();
    });

    it('should return entered last name', () => {
      expect(component.lastName?.value).toEqual('');
      component.form.controls.lastName.setValue('Smith');
      expect(component.lastName?.value).toEqual('Smith');
    });

    it('should fail if lastName has incorrect structure', () => {
      component.form.controls.lastName.setValue('bakker');
      expect(component.form.controls.lastName.hasError('correctName')).toBeTrue();
    });
  });

  describe('signUp', () => {
    const fakeEvent = {
      preventDefault: () => {},
    } as Event;

    beforeEach(() => {
      mockRouter.navigate.calls.reset();
    });

    it('should navigate to target url', () => {
      const fakeSignUpResponseData = {
        email: 'fake@a.com',
      } as SignUpResponseData;
      mockAuthenticationService.signUp.and.returnValue(
        of(fakeSignUpResponseData)
      );
      component.signUp(fakeEvent);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});

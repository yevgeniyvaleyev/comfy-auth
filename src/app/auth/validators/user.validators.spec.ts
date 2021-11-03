import { TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserValidators } from './user.validator';

describe('AuthGuardService', () => {
  let validators: UserValidators;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;

  beforeEach(() => {
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService', [
      'checkEmailUniqueness',
    ]);
    TestBed.configureTestingModule({
      providers: [
        UserValidators,
        { provide: AuthenticationService, useValue: mockAuthenticationService },
      ],
    });
    validators = TestBed.inject(UserValidators);
  });

  it('should be created', () => {
    expect(validators).toBeTruthy();
  });

  describe('isUniqueEmail', () => {
    const testEmail = 'super@duper.com';
    const fakeControl = {
      value: testEmail,
    } as AbstractControl;

    it('should return nell when email is unique', (done) => {
      mockAuthenticationService.checkEmailUniqueness.and.returnValue(of(true));
      validators
        .isUniqueEmail()(fakeControl)
        .subscribe((validatorResult) => {
          expect(validatorResult).toBeNull();
          expect(
            mockAuthenticationService.checkEmailUniqueness
          ).toHaveBeenCalledWith(testEmail);
          done();
        });
    });

    it('should return invalidaton data when email is not unique', (done) => {
      mockAuthenticationService.checkEmailUniqueness.and.returnValue(of(false));
      validators
        .isUniqueEmail()(fakeControl)
        .subscribe((validatorResult) => {
          expect(validatorResult).toEqual({
            isUniqueEmail: true,
          });
          expect(
            mockAuthenticationService.checkEmailUniqueness
          ).toHaveBeenCalledWith(testEmail);
          done();
        });
    });
  });

  describe('correctEmail', () => {
    it('should return null when email structure is correct', () => {
      const control = {
        value: 'super@duper.com',
      } as AbstractControl;
      expect(UserValidators.correctEmail(control)).toBeNull();
    });

    it('should return invalidaton data when email structure is not correct', () => {
      const control = {
        value: 'invalid-email.com',
      } as AbstractControl;
      expect(UserValidators.correctEmail(control)).toEqual({
        correctEmail: true,
      });
    });
  });

  describe('correctName', () => {
    it('should return null when name structure is correct', () => {
      const control = {
        value: 'Ronald',
      } as AbstractControl;
      expect(UserValidators.correctName(control)).toBeNull();
    });

    it('should return invalidaton data when name structure is not correct', () => {
      ['bart', 'BART', 'Z@#45', ''].forEach((value) => {
        const control = {
          value,
        } as AbstractControl;
        expect(UserValidators.correctName(control)).toEqual({
          correctName: true,
        });
      })
    });
  });

  describe('upperAndLowerCase', () => {
    it('should return null when lower and upper case letters present', () => {
      const control = {
        value: 'AbcD',
      } as AbstractControl;
      expect(UserValidators.upperAndLowerCase(control)).toBeNull();
    });

    it('should return invalidaton data when all cases are not present', () => {
      let control = {
        value: 'lower',
      } as AbstractControl;
      expect(UserValidators.upperAndLowerCase(control)).toEqual({
        capitalLetters: true,
      });

      control = {
        value: 'UPPER',
      } as AbstractControl;
      expect(UserValidators.upperAndLowerCase(control)).toEqual({
        smallLetters: true,
      });
    });
  });

  describe('preventUserNamesInPassword', () => {
    interface FieldsData {
      [key: string]: string;
    }
    const getControl = (fieldsData: FieldsData, errorFn: any): AbstractControl => ({
      get: (field: keyof FieldsData) => {
        const value = fieldsData[field] ?? '';
        return value ? { value, setErrors: (...args) => { errorFn(...args) } } : null;
      },
    } as AbstractControl);

    it('should validate fake form control works as expected', () => {
      const fieldsData: FieldsData = {
        password: 'Asdsdfrdf',
        firstName: 'Bob',
        lastName: 'Bakker',
      };

      const control = getControl(fieldsData, () => {});
      expect(control.get('password')?.value).toEqual(fieldsData.password);
      expect(control.get('firstName')?.value).toEqual(fieldsData.firstName);
      expect(control.get('lastName')?.value).toEqual(fieldsData.lastName);
    });

    it('should return null when password does not contain neither first nor last name', () => {
      const fieldsData: FieldsData = {
        password: 'Asdsdfrdf',
        firstName: 'Bob',
        lastName: 'Bakker',
      };
      const errorTestObj = { errorFn: () => {} };
      spyOn(errorTestObj, 'errorFn');
      const control = getControl(fieldsData, errorTestObj.errorFn);

      UserValidators.preventUserNamesInPassword(control);
      expect(errorTestObj.errorFn).not.toHaveBeenCalled();
    });

    it('should return invalidaton data when password contains first name', () => {
      const fieldsData: FieldsData = {
        password: 'xxxxBobxxxx',
        firstName: 'Bob',
        lastName: 'Bakker',
      };
      const errorTestObj = { errorFn: (...args: any[]) => {} };
      spyOn(errorTestObj, 'errorFn');
      const control = getControl(fieldsData, errorTestObj.errorFn);

      UserValidators.preventUserNamesInPassword(control);
      expect(errorTestObj.errorFn).toHaveBeenCalledWith({ containsFirstName: true });
    });

    it('should return invalidaton data when password contains last name', () => {
      const fieldsData: FieldsData = {
        password: 'xxxxBakkerxxxx',
        firstName: 'Bob',
        lastName: 'Bakker',
      };
      const errorTestObj = { errorFn: (...args: any[]) => {} };
      spyOn(errorTestObj, 'errorFn');
      const control = getControl(fieldsData, errorTestObj.errorFn);

      UserValidators.preventUserNamesInPassword(control);
      expect(errorTestObj.errorFn).toHaveBeenCalledWith({ containsLastName: true });
    });

  });
});

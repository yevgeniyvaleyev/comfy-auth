import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { APP_CONFIG } from '../config/tokens';
import { StorageService } from './storage.service';
import { LoginData, SignUpData, SignUpResponseData, StateCheckResponseData } from '../types';

import { ResponseInterceptor } from './response.interceptor';

describe('ResponseInterceptor', () => {
  let mockStorageService: StorageService;
  let http: HttpClient;
  let httpMock: HttpTestingController;
  const mockConfig = {
    api: {
      signUp: '/sign-up',
      login: '/login',
      verifyAuth: '/verify-authentication',
      logout: '/logout',
      checkEmail: '/check-email',
    },
  };

  beforeEach(() => {
    mockStorageService = {
      addEmail() {},
      get emails() {
        return [];
      },
      get authStatus() {
        return true;
      },
      set authStatus(status: boolean) {},
    } as any;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: APP_CONFIG, useValue: mockConfig },
        { provide: StorageService, useValue: mockStorageService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ResponseInterceptor,
          multi: true,
        },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('login', () => {
    const loginData = {
      email: 'a@a.com',
      password: 'SomePassword',
    } as LoginData;

    it('should return successful login mocked response', (done) => {
      spyOnProperty(mockStorageService, 'emails').and.returnValue(['a@a.com']);
      http
        .post<StateCheckResponseData>(mockConfig.api.login, loginData)
        .subscribe((response: StateCheckResponseData) => {
          expect(response.success).toBeTrue();
          done();
        });
    });

    it('should return fail login mocked response', (done) => {
      spyOnProperty(mockStorageService, 'emails').and.returnValue(['']);
      http
        .post<StateCheckResponseData>(mockConfig.api.login, loginData)
        .subscribe((response: StateCheckResponseData) => {
          expect(response.success).toBeFalse();
          done();
        });
    });
  });

  describe('logout', () => {
    it('should return successful logout mocked response', (done) => {
      http
        .post<StateCheckResponseData>(mockConfig.api.logout, {})
        .subscribe((response: StateCheckResponseData) => {
          expect(response.success).toBeTrue();
          done();
        });
    });
  });

  describe('checkEmail', () => {
    it('should return successful checkEmail mocked response', (done) => {
      spyOnProperty(mockStorageService, 'emails').and.returnValue(['x@x.com']);
      http
        .post<StateCheckResponseData>(mockConfig.api.checkEmail, {
          email: 'new@a.com',
        })
        .subscribe((response: StateCheckResponseData) => {
          expect(response.success).toBeTrue();
          done();
        });
    });

    it('should return fail checkEmail mocked response', (done) => {
      spyOnProperty(mockStorageService, 'emails').and.returnValue([
        'registered@x.com',
      ]);
      http
        .post<StateCheckResponseData>(mockConfig.api.checkEmail, {
          email: 'registered@x.com',
        })
        .subscribe((response: StateCheckResponseData) => {
          expect(response.success).toBeFalse();
          done();
        });
    });
  });

  describe('verifyAuth', () => {
    it('should return successful verifyAuth mocked response', (done) => {
      spyOnProperty(mockStorageService, 'authStatus').and.returnValue(true);
      http
        .post<StateCheckResponseData>(mockConfig.api.verifyAuth, {})
        .subscribe((response: StateCheckResponseData) => {
          expect(response.success).toBeTrue();
          done();
        });
    });

    it('should return fail verifyAuth mocked response', (done) => {
      spyOnProperty(mockStorageService, 'authStatus').and.returnValue(false);
      http
        .post<StateCheckResponseData>(mockConfig.api.verifyAuth, {})
        .subscribe((response: StateCheckResponseData) => {
          expect(response.success).toBeFalse();
          done();
        });
    });
  });

  describe('signUp', () => {
    it('should behave...', (done) => {
      const data: SignUpData = {
        firstName: 'Ron',
        lastName: 'Weasley',
        email: 'rupert@hogwarts.school',
        password: 'Expelliarmus',
      };
      const responseData = {
        _id: 'random',
        ...data
      };

      spyOn(mockStorageService, 'addEmail');
      http.post<SignUpResponseData>(mockConfig.api.signUp, data).subscribe((res: SignUpResponseData) => {
        done();
        expect(mockStorageService.addEmail).toHaveBeenCalledWith(responseData.email);
        expect(res.email).toEqual(data.email);
      });

      const req = httpMock.expectOne(mockConfig.api.signUp);

      expect(req.request.method).toEqual('POST');
      req.flush(responseData);
    });
  });
});

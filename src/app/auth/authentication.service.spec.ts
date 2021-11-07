import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from './../../environments/environment';
import { LoginData, SignUpData, SignUpResponseData, StateCheckResponseData } from '../types';


describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
      ],
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return authentication status', () => {
    expect(service.isLoggedIn).toBeFalse();
    // fake change of authentication state
    (service as any).isAuthenticated = true;
    expect(service.isLoggedIn).toBeTrue();
  });

  it('should return sign up data', (done) => {
    const data = { email: 'fake-1@a.com' } as SignUpData;
    const responseData = { email: 'fake-2@a.com' } as SignUpResponseData;
    service.signUp(data).subscribe((response) => {
      expect(response).toEqual(responseData)
      done();
    });
    const req = httpMock.expectOne(environment.api.signUp);
		expect(req.request.method).toEqual('POST');
		expect(req.request.body).toEqual(data);
		req.flush(responseData);
  });

  it('should return login data and set authentication status', (done) => {
    const data = { email: 'fake-1@a.com' } as LoginData;
    const responseData = { success: true } as StateCheckResponseData;
    service.login(data).subscribe((authStatus: boolean) => {
      expect(authStatus).toBeTrue();
      expect(service.isLoggedIn).toBeTrue();
      done();
    });
    const req = httpMock.expectOne(environment.api.login);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush(responseData);
  });

  it('should return logout data and set authentication status', (done) => {
    const responseData = { success: true } as StateCheckResponseData;
    service.logout().subscribe((isLoggedOut: boolean) => {
      // if logout response is successful the authentication state is false
      expect(isLoggedOut).toBeTrue();
      expect(service.isLoggedIn).toBeFalse();
      done();
    });
    const req = httpMock.expectOne(environment.api.logout);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({});
    req.flush(responseData);
  });

  it('should return login verification status data and set authentication status', (done) => {
    const responseData = { success: true } as StateCheckResponseData;
    service.verifyLoginStatus().subscribe((authStatus: boolean) => {
      expect(authStatus).toBeTrue();
      expect(service.isLoggedIn).toBeTrue();
      done();
    });
    const req = httpMock.expectOne(environment.api.verifyAuth);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({});
    req.flush(responseData);
  });

  it('should return email uniqueness data', (done) => {
    const responseData = { success: true } as StateCheckResponseData;
    const testEmail = 'super@duper.com';
    service.checkEmailUniqueness(testEmail).subscribe((uniquenessStatus: boolean) => {
      expect(uniquenessStatus).toBeTrue();
      done();
    });
    const req = httpMock.expectOne(environment.api.checkEmail);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ email: testEmail});
    req.flush(responseData);
  });

});

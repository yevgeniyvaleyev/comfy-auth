import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';

import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from './authentication.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let mockAuthenticationService: jasmine.SpyObj<AuthenticationService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthenticationService = jasmine.createSpyObj('AuthenticationService', [
      'verifyLoginStatus',
    ]);
    mockRouter = jasmine.createSpyObj('Router', [
      'navigate',
    ]);
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: AuthenticationService, useValue: mockAuthenticationService },
        { provide: Router, useValue: mockRouter },
      ],
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    const fakeActivatedRoute = {} as ActivatedRouteSnapshot;
    const fakeRouteStateRoute = { url: '/happy-url' } as RouterStateSnapshot;

    it('should navigate to target path if user authenticated', () => {
      mockAuthenticationService.verifyLoginStatus.and.returnValue(of(true));
      service.canActivate(fakeActivatedRoute, fakeRouteStateRoute);
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to /login page with target path reference, if user is not authenticated', (done) => {
      mockAuthenticationService.verifyLoginStatus.and.returnValue(of(false));
      const navigateConfig = {
        queryParams: {
          targetUrl: fakeRouteStateRoute.url,
        },
      }
      service.canActivate(fakeActivatedRoute, fakeRouteStateRoute).subscribe(() => {
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login'], navigateConfig);
        done();
      });
    });
  });
});

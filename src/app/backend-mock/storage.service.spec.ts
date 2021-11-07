import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage.service';
import { environment } from './../../environments/environment';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageService,
      ]
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set authStatus', () => {
    spyOn(localStorage, 'setItem');
    service.authStatus = true;

    expect(localStorage.setItem).toHaveBeenCalledWith(environment.storage.authStatusKey, 'true');
  });

  it('should get authStatus', () => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    const status = service.authStatus;

    expect(localStorage.getItem).toHaveBeenCalledWith(environment.storage.authStatusKey);
    expect(status).toBeTrue();
  });

  it('should get emails', () => {
    spyOn(localStorage, 'getItem').and.returnValue('b@b.com,y@y.com');

    expect(service.emails).toEqual(['b@b.com', 'y@y.com']);
    expect(localStorage.getItem).toHaveBeenCalledWith(environment.storage.emailsKey);
  });

  describe('addEmail', () => {
    it('should return false if email already added', () => {
      spyOnProperty(service, 'emails').and.returnValue(['b@b.com', 'y@y.com']);
      expect(service.addEmail('b@b.com')).toBeFalse();
    });

    it('should return true and add email if email is not added', () => {
      spyOnProperty(service, 'emails').and.returnValue(['x@x.com', 'y@y.com']);
      spyOn(localStorage, 'setItem');
      expect(service.addEmail('b@b.com')).toBeTrue();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        environment.storage.emailsKey,
        'x@x.com,y@y.com,b@b.com'
      );
    });
  });
});

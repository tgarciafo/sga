import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { LoginService } from './login.service';
import { User } from 'src/app/user/models/user';

describe('LoginService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: LoginService;
  let expectedUsers: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [LoginService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
    expectedUsers =[
      { user_id: 1, name: 'Tània Garcia Font', password: '12345678', email: 'tgarciafo@uoc.edu', type: 'Admin'  }, 
      { user_id: 2, name: 'Kali', password: '45781478', email: 'kali@uoc.edu', type: 'Magatzem' }
    ] as User[];
  });

  afterEach(() => {
    httpTestingController.verify();
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers and return the array of users', () => {

    service.getUsers().subscribe((data) => {
      expect(data).toEqual(expectedUsers);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/users',
    });

    req.flush(expectedUsers);
  });

});

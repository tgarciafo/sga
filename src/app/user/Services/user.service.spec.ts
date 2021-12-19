import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from '../models/user';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: UserService;
  let expectedUsers: User[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [UserService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
    expectedUsers = [
      {
        user_id:1,
        name:"Tània Garcia Font",
        password:"1234",
        email:"tgarciafo@uoc.edu",
        type:"Admin",
        client_id: NaN
      },
      {
        user_id:2,
        name:"Kali",
        password:"1234",
        email:"kali@uoc.edu",
        type:"Admin",
        client_id: NaN
      }
    ] as User[];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected Users (called once)', () => {
    service.getUsers().subscribe(
      Users => expect(Users).toEqual(expectedUsers, 'should return expected Users'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/getUsers');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedUsers);
  });

  it('should be OK returning no Users', () => {
    service.getUsers().subscribe(
      users => expect(users.length).toEqual(0, 'should have empty Users array'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/getUsers');
    req.flush([]);
  });

  it('should turn 404 into a user-friendly error', () => {
    const msg = 'Deliberate 404';
    const id = 1;

    service.getUser(id).subscribe(
      users => fail('expected to fail'),
      error => expect(error.message).toContain(msg)
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/getUser/'+id);

    req.flush(msg, {status: 404, statusText: 'Not Found'});
  });

  it('should return expected Users (called multiple times)', () => {
    service.getUsers().subscribe();
    service.getUsers().subscribe();
    service.getUsers().subscribe(
      users => expect(users).toEqual(expectedUsers, 'should return expected Users'),
      fail
    );

    const requests = httpTestingController.match(service.API_ENDPOINT+'/getUsers');
    expect(requests.length).toEqual(3, 'calls to getUsers()');

    requests[0].flush([]);
    requests[1].flush([{
      user_id:1,
      name:"Tània Garcia Font",
      password:"1234",
      email:"tgarciafo@uoc.edu",
      type:"Admin",
      User_id: NaN
    }]);
    requests[2].flush(expectedUsers);
  });

  it('should call getUsers and return the array of Users', () => {

    service.getUsers().subscribe((data) => {
      expect(data).toEqual(expectedUsers);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getUsers',
    });

    req.flush(expectedUsers);
  });

  it('should call getUser and return the appropriate User', () => {
    const id = 1;

    service.getUser(id).subscribe((data) => {
      expect(data).toEqual(expectedUsers[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getUser/'+id,
    });

    req.flush(expectedUsers[0]);
  });

  it('should call updateUser and return the updated User from the API', () => {
    const updatedUser: User = {
        user_id:1,
        name:"Tània Garcia Font",
        password:"12345678",
        email:"tgarciafo@uoc.edu",
        type:"Admin",
        client_id: NaN
    };

    service.updateUser(expectedUsers[0].user_id,expectedUsers[0]).subscribe((data) => {
      expect(data).toEqual(updatedUser);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: service.API_ENDPOINT + '/users/' + expectedUsers[0].user_id,
    });

    req.flush(updatedUser);
  });

  /* it('should call addUser and the API should return the User that was added', () => {
    const addedUser: User = {
        user_id:1,
        name:"Tània Garcia Font",
        password:"1234",
        email:"tgarciafo@uoc.edu",
        type:"Admin",
        client_id: NaN
    };
    service.addUser(addedUser).subscribe((data) => {
      expect(data).toEqual(addedUser);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/users',
    });

    req.flush(addedUser);
  }); */

  it('should call deleteUser and return the User that was deleted from the API', () => {
    service.deleteUser(expectedUsers[1]).subscribe((data) => {
      expect(data).toEqual(expectedUsers[1]);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: service.API_ENDPOINT + '/users/'+ expectedUsers[1].user_id,
    });

    req.flush(expectedUsers[1]);
  });
});

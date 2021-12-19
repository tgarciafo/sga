import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { LocationsService } from './locations.service';
import { Location } from '../models/location';

describe('LocationsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: LocationsService;
  let expectedLocations: Location[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LocationsService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LocationsService);
    expectedLocations =[
      { location_id: 1, location_description: 'Magatzem' }, 
      { location_id: 2, location_description: 'Nau' },
    ] as Location[];
  });

  afterEach(() => {
    httpTestingController.verify();
  });    

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected Locations (called once)', () => {
    service.getLocations().subscribe(
      locations => expect(locations).toEqual(expectedLocations, 'should return expected Locations'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/locations');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedLocations);
  });

  it('should be OK returning no Locations', () => {
    service.getLocations().subscribe(
      locations => expect(locations.length).toEqual(0, 'should have empty Locations array'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/locations');
    req.flush([]);
  });

  it('should turn 404 into a user-friendly error', () => {
    const msg = 'Deliberate 404';
    service.getLocations().subscribe(
      locations => fail('expected to fail'),
      error => expect(error.message).toContain(msg)
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/locations');

    req.flush(msg, {status: 404, statusText: 'Not Found'});
  });

  it('should return expected Locations (called multiple times)', () => {
    service.getLocations().subscribe();
    service.getLocations().subscribe();
    service.getLocations().subscribe(
      locations => expect(locations).toEqual(expectedLocations, 'should return expected locations'),
      fail
    );

    const requests = httpTestingController.match(service.API_ENDPOINT+'/locations');
    expect(requests.length).toEqual(3, 'calls to getLocations()');

    requests[0].flush([]);
    requests[1].flush([{location_id: 1, location_description: 'Magatzem'}]);
    requests[2].flush(expectedLocations);
  });

  it('should call getLocations and return the array of locations', () => {

    service.getLocations().subscribe((data) => {
      expect(data).toEqual(expectedLocations);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/locations',
    });

    req.flush(expectedLocations);
  });

  it('should call getLocation and return the appropriate Location', () => {
    const id = 1;

    service.getLocation(id).subscribe((data) => {
      expect(data).toEqual(expectedLocations[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getLocation/'+id,
    });

    req.flush(expectedLocations[0]);
  });

  it('should call updateLocation and return the updated Location from the API', () => {
    const updatedLocation: Location = {
      location_id: 1, 
      location_description: 'Magatzem'
    };

    service.updateLocation(expectedLocations[0].location_id,expectedLocations[0]).subscribe((data) => {
      expect(data).toEqual(updatedLocation);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: service.API_ENDPOINT + '/locations/' + expectedLocations[0].location_id,
    });

    req.flush(updatedLocation);
  });

  /* it('should call addLocation and the API should return the Location that was added', () => {
    const addedLocation: Location = {
      location_id: 3, 
      location_description: '101'
    };
    service.addLocation(addedLocation).subscribe((data) => {
      expect(data).toEqual(addedLocation);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/locations',
    });

    req.flush(addedLocation);
  }); */

  it('should call deleteLocation and return the Location that was deleted from the API', () => {
    service.deleteLocation(expectedLocations[1]).subscribe((data) => {
      expect(data).toEqual(expectedLocations[1]);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: service.API_ENDPOINT + '/locations/'+ expectedLocations[1].location_id,
    });

    req.flush(expectedLocations[1]);
  });
});

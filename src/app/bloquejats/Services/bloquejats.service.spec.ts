import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { BloquejatsService } from './bloquejats.service';
import { Bloquejat } from '../models/bloquejat';

describe('BloquejatsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: BloquejatsService;
  let expectedBloquejats: Bloquejat[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ BloquejatsService ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BloquejatsService);
    expectedBloquejats =[
      { bloquejat_id: 1, sscc: '384101283809555444' }, 
      { bloquejat_id: 2, sscc: '384101283809784557' },
    ] as Bloquejat[];
  });

  afterEach(() => {
    httpTestingController.verify();
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected bloquejats (called once)', () => {
    service.getBloquejats().subscribe(
      bloquejats => expect(bloquejats).toEqual(expectedBloquejats, 'should return expected bloquejats'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/bloquejats');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedBloquejats);
  });

  it('should be OK returning no bloquejats', () => {
    service.getBloquejats().subscribe(
      bloquejats => expect(bloquejats.length).toEqual(0, 'should have empty bloquejats array'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/bloquejats');
    req.flush([]);
  });

  it('should turn 404 into a user-friendly error', () => {
    const msg = 'Deliberate 404';
    service.getBloquejats().subscribe(
      bloquejats => fail('expected to fail'),
      error => expect(error.message).toContain(msg)
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/bloquejats');

    req.flush(msg, {status: 404, statusText: 'Not Found'});
  });

  it('should return expected bloquejats (called multiple times)', () => {
    service.getBloquejats().subscribe();
    service.getBloquejats().subscribe();
    service.getBloquejats().subscribe(
      bloquejats => expect(bloquejats).toEqual(expectedBloquejats, 'should return expected bloquejats'),
      fail
    );

    const requests = httpTestingController.match(service.API_ENDPOINT+'/bloquejats');
    expect(requests.length).toEqual(3, 'calls to getBloquejats()');

    requests[0].flush([]);
    requests[1].flush([{bloquejats_id: 1, sscc: '384101283825478512'}]);
    requests[2].flush(expectedBloquejats);
  });

  it('should call getBloquejats and return the array of bloquejats', () => {

    service.getBloquejats().subscribe((data) => {
      expect(data).toEqual(expectedBloquejats);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/bloquejats',
    });

    req.flush(expectedBloquejats);
  });

  it('should call deleteBloquejat and return the bloquejat that was deleted from the API', () => {
    const id = 1;

    service.deleteBloquejat(1).subscribe((data) => {
      expect(data).toEqual(expectedBloquejats[1]);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: service.API_ENDPOINT + '/bloquejats/'+ id,
    });

    req.flush(expectedBloquejats[1]);
  });

  it('should call getBloquejat and return the appropriate Bloquejat', () => {
    const id = 1;

    service.getBloquejat(id).subscribe((data) => {
      expect(data).toEqual(expectedBloquejats[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getBloquejat/'+id,
    });

    req.flush(expectedBloquejats[0]);
  });

 /*  it('should call addBloquejat and the API should return the bloquejat that was added', () => {
    const addedBloquejat: Bloquejat = {
      bloquejat_id: 3, 
      sscc: '384101283800475147'
    };
    service.addBloquejat(addedBloquejat).subscribe((data) => {
      expect(data).toEqual(addedBloquejat);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/palets',
    });
    
    req.flush(addedBloquejat);
  }); */

  it('should call consultaBloquejats and the API should return the bloquejats from the client', () => {
    const client_id: number = 1;
    const consultaB: any[] = [
      {
        bloquejat_id:18,
        sscc:"384100557721372546",
        description_client:"Fruiti",
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2022-07-21",
        location_description:"Magatzem principal",
        client_id:1
      },{
        bloquejat_id:27,
        sscc:"384100557723775577",
        description_client:"Fruiti",
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2023-01-01",
        location_description:"Magatzem principal",
        client_id:1
      }
    ];

    service.consultaBloquejats(client_id).subscribe((data) => {
      expect(data).toEqual(consultaB);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/getBloquejats/'+client_id,
    });
    
    req.flush(consultaB);
  });

  it('should call consultaBloquejatsEdit and the API should return the bloquejats', () => {

    const consultaBE = [
      {
        bloquejat_id:18,
        sscc:"384100557721372546",
        description_client:"Fruiti",
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2022-07-21",
        location_description:"Magatzem principal",
      },{
        bloquejat_id:27,
        sscc:"384100557723775577",
        description_client:"Fruiti",
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2023-01-01",
        location_description:"Magatzem principal",
      }
    ];

    service.consultaBloquejatsEdit().subscribe((data) => {
      expect(data).toEqual(consultaBE);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/getBloquejatsEdit',
    });
    
    req.flush(consultaBE);
  });
});

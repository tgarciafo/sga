import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { PlanificationService } from './planification.service';
import { Planification } from '../models/planification';
import { Palet } from 'src/app/palets/models/palet';

describe('PlanificationService', () => {
  let service: PlanificationService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let expectedPlanifications: Planification[];
  let expectedGetPlanifications: any[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [ PlanificationService ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PlanificationService);
    expectedPlanifications = [
      { planification_id: 1, data_sortida: new Date('2021-12-05'), sscc: 0, albara_sortida: '1245', product_id: 2, description_prod: 'Suc Llimona 1.5L', user_id: 1},
      { planification_id: 2, data_sortida: new Date('2021-12-05'), sscc: 0, albara_sortida: '1245', product_id: 1, description_prod: 'Suc Taronja 1.5L', user_id: 1}
    ];
    expectedGetPlanifications = [
      { planification_id: 1, data_sortida: new Date('2021-12-05'), sscc: 0, albara_sortida: '1245', product_id: 2, user_id: 1},
      { planification_id: 2, data_sortida: new Date('2021-12-05'), sscc: 0, albara_sortida: '1245', product_id: 1, user_id: 1}
    ];
  });

  afterEach(() => {
    httpTestingController.verify();
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected Planifications (called once)', () => {

    service.get().subscribe(
      planifications => expect(planifications).toEqual(expectedPlanifications, 'should return expected Planifications'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/planifications');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedPlanifications);
  });

  it('should be OK returning no Planifications', () => {
    service.get().subscribe(
      planifications => expect(planifications.length).toEqual(0, 'should have empty Planifications array'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/planifications');
    req.flush([]);
  });

  it('should turn 404 into a user-friendly error', () => {
    const msg = 'Deliberate 404';
    const albara = '1245';

    service.getPlanifications(albara).subscribe(
      planifications => fail('expected to fail'),
      error => expect(error.message).toContain(msg)
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/getPlanifications/' + albara);

    req.flush(msg, {status: 404, statusText: 'Not Found'});
  });

  it('should return expected Planifications (called multiple times)', () => {
    service.get().subscribe();
    service.get().subscribe();
    service.get().subscribe(
      planifications => expect(planifications).toEqual(expectedPlanifications, 'should return expected Planifications'),
      fail
    );

    const requests = httpTestingController.match(service.API_ENDPOINT+'/planifications');
    expect(requests.length).toEqual(3, 'calls to get()');

    requests[0].flush([]);
    requests[1].flush([{ planification_id: 1, data_sortida: new Date('2021-12-05'), sscc: 0, albara_sortida: '1245', product_id: 2, description_prod: 'Suc Llimona 1.5L', user_id: 1}]);
    requests[2].flush(expectedPlanifications);
  });

  it('should call getPlanifications and return the array of Planifications', () => {

    const albara = '1245';

    service.getPlanifications(albara).subscribe((data) => {
      expect(data).toEqual(expectedGetPlanifications);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getPlanifications/' + albara,
    });

    req.flush(expectedGetPlanifications);
  });

  it('should call getPlanification and return the appropriate Planification', () => {
    const albara = expectedGetPlanifications[0].albara_sortida;

    service.getPlanification(albara).subscribe((data) => {
      expect(data).toEqual(expectedGetPlanifications[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getPlanification/'+ albara,
    });

    req.flush(expectedGetPlanifications[0]);
  });

  it('should call addPlanification and the API should return the Planification that was added', () => {
    const addedPlanification: Planification = {
        planification_id: 1, 
        data_sortida: new Date('2021-12-05'), 
        sscc: 0, 
        albara_sortida: '1245', 
        product_id: 2,
        description_prod: 'Suc Llimona 1.5L',
        user_id: 1
    };
    service.addPlanification(addedPlanification).subscribe((data) => {
      expect(data).toEqual(addedPlanification);
    });

    const req = httpTestingController.expectOne({
      method: 'POST', 
      url: service.API_ENDPOINT+'/planifications',
    });

    req.flush(addedPlanification);
  });

  it('should call deletePlanification and return the Planification that was deleted from the API', () => {
    
    service.deletePlanification(expectedPlanifications[1].product_id, expectedPlanifications[1].albara_sortida).subscribe((data) => {
      expect(data).toEqual(expectedPlanifications[1]);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: service.API_ENDPOINT + '/destroy/'+ expectedPlanifications[1].product_id + '/' + expectedPlanifications[1].albara_sortida,
    });

    req.flush(expectedPlanifications[1]);
  });

  it('should call comptador and the API should return the comptador', () => {
    const comptador= 2;
    const albara = expectedPlanifications[0].albara_sortida;

    service.comptador(expectedPlanifications).subscribe((data) => {
      expect(data).toEqual(comptador);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/num_pal_sortida/' + albara,
    });

    req.flush(comptador);
  });

  it('should call deleteLinePlanification and the API should return the DeleteLinePlanification', () => {
    const palet: any = [{
        sscc: '384101283809547845', 
        product_id: 1, 
        data_entrada: '2021-10-01', 
        client_id: 1, 
        albara_entrada: '202141',
        lot: '744874M',
        qty: 45,
        caducitat: new Date('2022-01-10'),
        albara_sortida: '500641',
        data_sortida: '2021-12-01',
        location_id: 1
    }];
    const albara_sortida = palet[0].albara_sortida;
    const product_id = palet[0].product_id;

    service.deleteLinePlanification(palet).subscribe((data) => {
      expect(data).toEqual(albara_sortida);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE', 
      url: service.API_ENDPOINT+'/destroyLine/' + product_id + '/' + albara_sortida,
    });

    req.flush(albara_sortida);
  });

  it('should call consultaPlanifications and the API should return the consultaPlanifications', () => {

    const consultaPlani = [
      {
        albara_sortida:"1245",
        description_client:"Fruiti",
        num_palets:1
      },
      {
        albara_sortida:"451",
        description_client:"Fruiti",
        num_palets:1
      },
      {
        albara_sortida:"454",
        description_client:"Fruiti",
        num_palets:1
      }
    ];

    service.consultaPlanifications().subscribe((data) => {
      expect(data).toEqual(consultaPlani);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/consultaPlanifications',
    });

    req.flush(consultaPlani);
  });

  it('should call deleteEntirePlanification and the API should return the deleteEntirePlanification that was added', () => {

    const consultaPlani = [
      {
        albara_sortida:"1245",
        description_client:"Fruiti",
        num_palets:1
      },
      {
        albara_sortida:"451",
        description_client:"Fruiti",
        num_palets:1
      },
      {
        albara_sortida:"454",
        description_client:"Fruiti",
        num_palets:1
      }
    ];

    service.deleteEntirePlanification(consultaPlani[0].albara_sortida).subscribe((data) => {
      expect(data).toEqual(expectedPlanifications[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE', 
      url: service.API_ENDPOINT+'/destroyEntire/'+consultaPlani[0].albara_sortida,
    });

    req.flush(expectedPlanifications[0]);
  });  
});

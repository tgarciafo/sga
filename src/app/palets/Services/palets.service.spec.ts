import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { PaletsService } from './palets.service';
import { Palet } from '../models/palet';
import { consultaSSCC } from '../actions';

describe('PaletsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: PaletsService;
  let expectedPalets: Palet[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PaletsService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PaletsService);
    expectedPalets =[
      { sscc: '384101283809547845', 
        product_id: 1, 
        data_entrada: '2021-10-01', 
        client_id: 1, 
        albara_entrada: '202141',
        lot: '744874M',
        qty: 45,
        caducitat: new Date('2022-01-10'),
        albara_sortida: '500641',
        data_sortida: '2021-12-01',
        location_id: 1 },
        { sscc: '384101283809665774', 
        product_id: 2, 
        data_entrada: '2021-11-05', 
        client_id: 1, 
        albara_entrada: '202155',
        lot: '744874P',
        qty: 45,
        caducitat: new Date('2022-03-10'),
        albara_sortida: '500655',
        data_sortida: '2021-12-20',
        location_id: 2 }
    ] as Palet[];
  });

  afterEach(() => {
    httpTestingController.verify();
  }); 

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected palets (called once)', () => {
    service.getPalets().subscribe(
      palets => expect(palets).toEqual(expectedPalets, 'should return expected Palets'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/palets');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedPalets);
  });

  it('should be OK returning no Palets', () => {
    service.getPalets().subscribe(
      palets => expect(palets.length).toEqual(0, 'should have empty Palets array'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/palets');
    req.flush([]);
  });

  it('should turn 404 into a user-friendly error', () => {
    const msg = 'Deliberate 404';
    service.getPalets().subscribe(
      palets => fail('expected to fail'),
      error => expect(error.message).toContain(msg)
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/palets');

    req.flush(msg, {status: 404, statusText: 'Not Found'});
  });

  it('should return expected palets (called multiple times)', () => {
    service.getPalets().subscribe();
    service.getPalets().subscribe();
    service.getPalets().subscribe(
      palets => expect(palets).toEqual(expectedPalets, 'should return expected Palets'),
      fail
    );

    const requests = httpTestingController.match(service.API_ENDPOINT+'/palets');
    expect(requests.length).toEqual(3, 'calls to getPalets()');

    requests[0].flush([]);
    requests[1].flush([{sscc: '384101283809547845', 
                        product_id: 1, 
                        data_entrada: '2021-10-01', 
                        client_id: 1, 
                        albara_entrada: '202141',
                        lot: '744874M',
                        qty: 45,
                        caducitat: new Date('2022-01-10'),
                        albara_sortida: '500641',
                        data_sortida: '2021-12-01',
                        location_id: 1}
                      ]);
    requests[2].flush(expectedPalets);
  });

  it('should call getPalets and return the array of palets', () => {

    service.getPalets().subscribe((data) => {
      expect(data).toEqual(expectedPalets);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/palets',
    });

    req.flush(expectedPalets);
  });

  it('should call getPalet and return the appropriate Palet', () => {
    const sscc  = '384101283809547845';

    service.getPalet(sscc).subscribe((data) => {
      expect(data).toEqual(expectedPalets[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getPalet/'+ sscc,
    });

    req.flush(expectedPalets[0]);
  });

  it('should call contador and the API should return the contador', () => {
    const palet: Palet = expectedPalets[0];
    const albara = palet.albara_entrada;
    const num_pal = 2;

    service.contador(palet).subscribe((data) => {
      expect(data).toEqual(num_pal);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/num_pal/'+ albara,
    });
    
    req.flush(num_pal);
  });

  it('should call consultaEntrada and the API should return the consultaEntrada', () => {
    const data = new Date('2021-10-01');
    const data2 = new Date('2021-11-01');
    const client_id = 1;
    const consultaE: any[] =[
      {
        albara_entrada: "1245",
        data_entrada: "2021-12-06",
        client_id: 1,
        description_client:"Fruiti",
        num_palets: 3,
      },
      {
        albara_entrada: "1246",
        data_entrada: "2021-12-07",
        client_id: 1,
        description_client: "Fruiti",
        num_palets: 1,
      }
    ]; 

    service.consultaEntrada(data, data2, client_id).subscribe((data) => {
      expect(data).toEqual(consultaE);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/showEntries/'+ data + '/' + data2 + '/' + client_id,
    });
    
    req.flush(consultaE);
  });

  it('should call entradesPal and the API should return the entradesPal', () => {
    const consultaE: any[] =[
      {
        albara_entrada: "1245",
        data_entrada: "2021-12-06",
        client_id: 1,
        description_client:"Fruiti",
        num_palets: 3,
      },
      {
        albara_entrada: "1246",
        data_entrada: "2021-12-07",
        client_id: 1,
        description_client: "Fruiti",
        num_palets: 1,
      }
    ];

    const consultaPal: any[] =[
      {
        albara_entrada:"1246",
        data_entrada:"2021-12-07",
        sscc:"385600557721778916",
        qty:45,
        lot:"0874512L",
        caducitat:"2022-07-21",
        description_prod:"Suc Llimona 1.5L",
      }
    ];
    
    const albara = consultaE[1].albara_entrada;

    service.entradesPal(albara).subscribe((data) => {
      expect(data).toEqual(consultaPal);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/showPalEntries/'+ albara,
    });
    
    req.flush(consultaPal);
  });

  it('should call consultaSortida and the API should return the consultaSortida', () => {
    const data = new Date('2021-10-01');
    const data2 = new Date('2021-11-01');
    const client_id = 1;
    const consultaS: any[] =[
      {
        albara_sortida: "1245",
        data_sortida: "2021-12-06",
        client_id: 1,
        description_client:"Fruiti",
        num_palets: 3,
      },
      {
        albara_sortida: "1246",
        data_sortida: "2021-12-07",
        client_id: 1,
        description_client: "Fruiti",
        num_palets: 1,
      }
    ]; 

    service.consultaSortida(data, data2, client_id).subscribe((data) => {
      expect(data).toEqual(consultaS);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/showExpeditions/'+ data + '/' + data2 + '/' + client_id,
    });
    
    req.flush(consultaS);
  });

  it('should call sortidesPal and the API should return the sortidesPal', () => {
    const consultaS: any[] =[
      {
        albara_sortida: "1245",
        data_sortida: "2021-12-06",
        client_id: 1,
        description_client:"Fruiti",
        num_palets: 3,
      },
      {
        albara_sortida: "1246",
        data_sortida: "2021-12-07",
        client_id: 1,
        description_client: "Fruiti",
        num_palets: 1,
      }
    ];

    const consultaPalSortida: any[] =[
      {
        albara_sortida:"1246",
        data_sortida:"2021-12-07",
        sscc:"385600557721778916",
        qty:45,
        lot:"0874512L",
        caducitat:"2022-07-21",
        description_prod:"Suc Llimona 1.5L",
      }
    ];
    
    const albara = consultaS[1].albara_sortida;

    service.sortidesPal(albara).subscribe((data) => {
      expect(data).toEqual(consultaPalSortida);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/showPalExpeditions/'+ albara,
    });
    
    req.flush(consultaPalSortida);
  });

  it('should call palResta and the API should return the palResta', () => {
    const product_id = 1;
    const palets = 32;

    service.palResta(product_id).subscribe((data) => {
      expect(data).toEqual(palets);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/getPalResta/'+ product_id,
    });
    
    req.flush(palets);
  });

  it('should call estocClient and the API should return the estocClient', () => {
    const client_id = 1;
    const data = new Date('2021-12-19');
    const estocClient = [
      {
        description_prod:"Suc Taronja 1.5L",
        reference:"211947",
        caducitat:"2022-06-05",
        description_client:"Fruiti",
        num_palets:1
      },
      {
        description_prod:"Suc Taronja 1.5L",
        reference:"211947",
        caducitat:"2022-07-21",
        description_client:"Fruiti",
        num_palets:1
      }
    ];

    service.estocClient(client_id, data).subscribe((data) => {
      expect(data).toEqual(estocClient);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/estocClient/'+ client_id + '/' + data,
    });
    
    req.flush(estocClient);
  });

  it('should call estocProduct and the API should return the estocProduct', () => {
    const product_id = 1;
    const data = new Date('2021-12-19');
    const estocProduct = [
      {
        description_prod:"Suc Taronja 1.5L",
        reference:"211947",
        caducitat:"2022-06-05",
        description_client:"Fruiti",
        num_palets:1
      },
      {
        description_prod:"Suc Taronja 1.5L",
        reference:"211947",
        caducitat:"2022-07-21",
        description_client:"Fruiti",
        num_palets:1
      }
    ];

    service.estocProduct(product_id, data).subscribe((data) => {
      expect(data).toEqual(estocProduct);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/estocProduct/'+ product_id + '/' + data,
    });
    
    req.flush(estocProduct);
  });

  it('should call estocUbicacio and the API should return the estocUbicacio', () => {
    const client_id = 1;
    const location_id = 1;
    const data = new Date('2021-12-19');
    const estocUbicacio = [
      {
        description_prod:"Suc Taronja 1.5L",
        location_description:"Magatzem principal",
        caducitat:"2022-06-05",
        description_client:"Fruiti",
        num_palets:1
      },
      {
        description_prod:"Suc Taronja 1.5L",
        location_description:"Magatzem principal",
        caducitat:"2022-07-21",
        description_client:"Fruiti",
        num_palets:1
      }
    ];

    service.estocUbicacio(client_id, location_id, data).subscribe((data) => {
      expect(data).toEqual(estocUbicacio);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/estocUbicacio/'+ client_id + '/' + location_id + '/' + data,
    });
    
    req.flush(estocUbicacio);
  });

  it('should call estocAlbara and the API should return the estocAlbara', () => {
    const num_albara = '888';
    const client_id = 1;
    const estocAlbara = [
      {
        albara_entrada:"888",
        data_entrada:"2021-11-10",
        albara_sortida:'',
        data_sortida: new Date(),
        qty:45,
        lot:"0874512L",
        sscc:"384100557721372546",
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2022-07-21",
        description_client:"Fruiti"
      },
      {
        albara_entrada:"888",
        data_entrada:"2021-11-10",
        albara_sortida: '',
        data_sortida: new Date(),
        qty:45,
        lot:"0528741M",
        sscc:"384100557722775476",
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2022-07-22",
        description_client:"Fruiti"
      }
    ];

    service.estocAlbara(num_albara, client_id).subscribe((data) => {
      expect(data).toEqual(estocAlbara);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/estocAlbara/'+ num_albara + '/' + client_id,
    });
    
    req.flush(estocAlbara);
  });

  it('should call estocLot and the API should return the estocLot', () => {
    const client_id = 1;
    const product_id = 1;
    const data = new Date('2021-12-19');
    const estocLot = [
      {
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2022-06-05",
        description_client:"Fruiti",
        lot: "0528741M",
        num_palets:1
      },
      {
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2022-07-21",
        description_client:"Fruiti",
        lot: "0528889P",
        num_palets:1
      }
    ];

    service.estocLot(client_id, product_id, data).subscribe((data) => {
      expect(data).toEqual(estocLot);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/estocLot/'+ client_id + '/' + product_id + '/' + data,
    });
    
    req.flush(estocLot);
  });

  it('should call consultaSSCC and the API should return the consultaSSCC', () => {
    const client_id = 1;
    const sscc = '384100557715785239';
    const consultaSSCC = [
      {
        albara_entrada:"1234",
        data_entrada:"2021-10-30",
        albara_sortida:"111",
        data_sortida:"2021-11-11",
        qty:45,
        lot:"0521474N",
        sscc:"384100557715785239",
        location_description:"Magatzem principal",
        description_prod:"Suc Taronja 1.5L",
        caducitat:"2022-07-19",
        description_client:"Fruiti"
      }
    ];

    service.consultaSSCC(sscc, client_id).subscribe((data) => {
      expect(data).toEqual(consultaSSCC);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/consultaSSCC/'+ sscc + '/' + client_id,
    });
    
    req.flush(consultaSSCC);
  });

  it('should call consultaSsccProduct and the API should return the consultaSsccProduct', () => {
    const product_id = 1;
    const data = new Date('2021-12-18');
    const caducitat = new Date('2022-08-20');
    const consultaSsccProduct = [
      {
        description_prod:"Suc Taronja 1.5L",
        reference:"211947",
        caducitat:"2022-08-20",
        description_client:"Fruiti",
        sscc:"384100557715784228"
      }
    ];

    service.consultaSsccProduct(product_id, data, caducitat).subscribe((data) => {
      expect(data).toEqual(consultaSsccProduct);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/consultaSsccProduct/'+ product_id + '/' + data + '/' + caducitat,
    });
    
    req.flush(consultaSsccProduct);
  });
});

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Producte } from '../models/producte';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductesService } from './productes.service';

describe('ProductesService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductesService;
  let expectedProductes: Producte[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ProductesService]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductesService);
    expectedProductes = [
      {product_id:1,
        ean: 18457165487451,
        reference:"211947",
        quantity:45,
        client_id:1,
        description_prod:"Suc Taronja 1.5L"},
        {product_id:2,
          ean:18410055620140,
          reference:"211946",
          quantity:45,
          client_id:1,
          description_prod:"Suc Llimona 1.5L"}
    ] as Producte[];
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected Productes (called once)', () => {
    service.getProductes().subscribe(
      productes => expect(productes).toEqual(expectedProductes, 'should return expected Productes'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/products');
    expect(req.request.method).toEqual('GET');

    req.flush(expectedProductes);
  });

  it('should be OK returning no Productes', () => {
    service.getProductes().subscribe(
      productes => expect(productes.length).toEqual(0, 'should have empty Productes array'),
      fail
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/products');
    req.flush([]);
  });

  it('should turn 404 into a user-friendly error', () => {
    const msg = 'Deliberate 404';
    service.getProductes().subscribe(
      productes => fail('expected to fail'),
      error => expect(error.message).toContain(msg)
    );

    const req = httpTestingController.expectOne(service.API_ENDPOINT+'/products');

    req.flush(msg, {status: 404, statusText: 'Not Found'});
  });

  it('should return expected Productes (called multiple times)', () => {
    service.getProductes().subscribe();
    service.getProductes().subscribe();
    service.getProductes().subscribe(
      productes => expect(productes).toEqual(expectedProductes, 'should return expected Productes'),
      fail
    );

    const requests = httpTestingController.match(service.API_ENDPOINT+'/products');
    expect(requests.length).toEqual(3, 'calls to getProductes()');

    requests[0].flush([]);
    requests[1].flush([{Producte_id: 1, Producte_description: 'Magatzem'}]);
    requests[2].flush(expectedProductes);
  });

  it('should call getProductes and return the array of Productes', () => {

    service.getProductes().subscribe((data) => {
      expect(data).toEqual(expectedProductes);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/products',
    });

    req.flush(expectedProductes);
  });

  it('should call getProducte and return the appropriate Producte', () => {
    const id = 1;

    service.getProducte(id).subscribe((data) => {
      expect(data).toEqual(expectedProductes[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getProduct/'+id,
    });

    req.flush(expectedProductes[0]);
  });

  it('should call updateProducte and return the updated Producte from the API', () => {
    const updatedProducte: Producte = {
        product_id:2,
        ean:18410055620140,
        reference:"211950",
        quantity:45,
        client_id:1,
        description_prod:"Suc Llimona 1.5L"
    };

    service.updateProducte(expectedProductes[1].product_id,expectedProductes[1]).subscribe((data) => {
      expect(data).toEqual(updatedProducte);
    });

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: service.API_ENDPOINT + '/products/' + expectedProductes[1].product_id,
    });

    req.flush(updatedProducte);
  });

  /* it('should call addProducte and the API should return the Producte that was added', () => {
    const addedProducte: Producte = {
        product_id:3,
        ean:18410055620146,
        reference:"211959",
        quantity:45,
        client_id:1,
        description_prod:"Suc Poma 1.5L"
    };
    service.addProducte(addedProducte).subscribe((data) => {
      expect(data).toEqual(addedProducte);
    });

    const req = httpTestingController.expectOne({
      method: 'GET', 
      url: service.API_ENDPOINT+'/products',
    });

    req.flush(addedProducte);
  }); */

  it('should call deleteProducte and return the Producte that was deleted from the API', () => {
    service.deleteProducte(expectedProductes[1]).subscribe((data) => {
      expect(data).toEqual(expectedProductes[1]);
    });

    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: service.API_ENDPOINT + '/products/'+ expectedProductes[1].product_id,
    });

    req.flush(expectedProductes[1]);
  });

  it('should call getClientProductes and return the getClientProductes that was deleted from the API', () => {
    
    const client_id= 1;

    const clientProd = [
      {
        product_id:1,
        ean:"18457165487451",
        reference:"211947",
        quantity:45,
        client_id:1,
        description_client:"Fruiti",
        description_prod:"Suc Taronja 1.5L"
      },
      {
        product_id:2,
        ean:"18410055620140",
        reference:"211946",
        quantity:45,
        client_id:1,
        description_client:"Fruiti",
        description_prod:"Suc Llimona 1.5L"
      },
    ]

    service.getClientProductes(client_id).subscribe((data) => {
      expect(data).toEqual(clientProd);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: service.API_ENDPOINT + '/getClientProduct/'+ client_id,
    });

    req.flush(clientProd);
  });
});

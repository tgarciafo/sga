import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from './clients.service';
import { Client } from '../models/client';

  describe('ClientsService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let service: ClientsService;
    let expectedClients: Client[];

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ ClientsService ]
      });
  
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      service = TestBed.inject(ClientsService);
      expectedClients =[
        { client_id: 1, client_code: 88745, description_client: 'Fruiti' }, 
        { client_id: 2, client_code: 77784, description_client: 'Pepsi&Co' },
      ] as Client[];
    });
  
    afterEach(() => {
      httpTestingController.verify();
    });    

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  
    it('should return expected Clients (called once)', () => {
      service.getClients().subscribe(
        clients => expect(clients).toEqual(expectedClients, 'should return expected Clients'),
        fail
      );
  
      const req = httpTestingController.expectOne(service.API_ENDPOINT+'/clients');
      expect(req.request.method).toEqual('GET');
  
      req.flush(expectedClients);
    });
  
    it('should be OK returning no Clients', () => {
      service.getClients().subscribe(
        clients => expect(clients.length).toEqual(0, 'should have empty Clients array'),
        fail
      );
  
      const req = httpTestingController.expectOne(service.API_ENDPOINT+'/clients');
      req.flush([]);
    });
  
    it('should turn 404 into a user-friendly error', () => {
      const msg = 'Deliberate 404';
      service.getClients().subscribe(
        clients => fail('expected to fail'),
        error => expect(error.message).toContain(msg)
      );
  
      const req = httpTestingController.expectOne(service.API_ENDPOINT+'/clients');
  
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  
    it('should return expected Clients (called multiple times)', () => {
      service.getClients().subscribe();
      service.getClients().subscribe();
      service.getClients().subscribe(
        clients => expect(clients).toEqual(expectedClients, 'should return expected Clients'),
        fail
      );
  
      const requests = httpTestingController.match(service.API_ENDPOINT+'/clients');
      expect(requests.length).toEqual(3, 'calls to getClients()');
  
      requests[0].flush([]);
      requests[1].flush([{client_id: 1, client_code: 88745, description_client: 'Fruiti'}]);
      requests[2].flush(expectedClients);
    });

    it('should call getClients and return the array of clents', () => {

      service.getClients().subscribe((data) => {
        expect(data).toEqual(expectedClients);
      });
  
      const req = httpTestingController.expectOne({
        method: 'GET',
        url: service.API_ENDPOINT + '/clients',
      });
  
      req.flush(expectedClients);
    });

    it('should call getClient and return the appropriate Client', () => {
      const id = 1;
  
      service.getClient(id).subscribe((data) => {
        expect(data).toEqual(expectedClients[0]);
      });
  
      const req = httpTestingController.expectOne({
        method: 'GET',
        url: service.API_ENDPOINT + '/getClient/'+id,
      });
  
      req.flush(expectedClients[0]);
    });
  
    it('should call updateClient and return the updated client from the API', () => {
      const updatedClient: Client = {
        client_id: 1, 
        client_code: 88777, 
        description_client: 'Fruiti'
      };
  
      service.updateClient(expectedClients[0].client_id,expectedClients[0]).subscribe((data) => {
        expect(data).toEqual(updatedClient);
      });
  
      const req = httpTestingController.expectOne({
        method: 'PUT',
        url: service.API_ENDPOINT + '/clients/' + expectedClients[0].client_id,
      });
  
      req.flush(updatedClient);
    });

    /* it('should call addClient and the API should return the client that was added', () => {
      const addedClient: Client = {
        client_id: 3, 
        client_code: 12777, 
        description_client: 'Grues Pons'
      };
      service.addClient(addedClient).subscribe((data) => {
        expect(data).toEqual(addedClient);
      });
  
      const req = httpTestingController.expectOne({
        method: 'GET', 
        url: service.API_ENDPOINT+'/clients',
      });

      req.flush(addedClient);
    }); */
  
    it('should call deleteClient and return the client that was deleted from the API', () => {
      service.deleteClient(expectedClients[1]).subscribe((data) => {
        expect(data).toEqual(expectedClients[1]);
      });
  
      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: service.API_ENDPOINT + '/clients/'+ expectedClients[1].client_id,
      });
  
      req.flush(expectedClients[1]);
    });
  }); 

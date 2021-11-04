import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Block } from '../models/block';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  API_ENDPOINT = 'http://localhost/sga/public/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private HttpClient: HttpClient) { }

  get(){
    return this.HttpClient.get<Block[]>(this.API_ENDPOINT + '/blocked');
  }

  getBlocks(): Observable<Block[]>{
    return this.get().pipe(
        catchError(this.handleError<Block[]>('getBlocked', []))
      );
  }

  getBlock(id: number | undefined): Observable<Block>{
    return this.HttpClient.get<Block>(this.API_ENDPOINT + '/getBlocked/'+id).pipe(
      catchError(this.handleError<Block>(`getBlocked id=${id}`))
    );
  }

  addBlock(block:Block): Observable<Block>{
    return this.HttpClient.post<Block>(this.API_ENDPOINT+'/blocked', block, this.httpOptions).pipe(
      catchError(this.handleError<Block>('addBlock'))
    );
  }

  deleteBlock(block: Block | number): Observable<Block>{
    const id = typeof block === 'number' ? block : block.block_id;

    return this.HttpClient.delete<Block>(this.API_ENDPOINT + '/getBlocked/'+id, this.httpOptions).pipe(
      catchError(this.handleError<Block>('deleteBlock'))
    );
  }

  /* private log(message: string) {
    this.messageService.add(`Blockervice: ${message}`);
  } */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
/*       this.log(`${operation} failed: ${error.message}`);
 */      return of(result as T);
    };
  }

}

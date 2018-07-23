import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { ENV } from '../env.config';
import { ProductModel } from '../models/product.model';

@Injectable()
export class ProductService {
  private currentUser : any;
  constructor(private http: HttpClient,private router: Router) { }

  private get _authHeader(): string {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.currentUser.token;
  }


  gettickers$() {
    return this.http
      .get(`${ENV.BASE_API}tickers`, {
        headers: new HttpHeaders().set('authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // GET list of public, future events
  //getUserById$(id: number): Observable<ClientModel> {
    getUserById$(id: number) {
    return this.http
      .get(`${ENV.BASE_API}ticker/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // POST new event (admin only)
  //postEvent$(event: TickerModel): Observable<TickerModel> {
    postEvent$(event) {
    return this.http
      .post(`${ENV.BASE_API}ticker`, event, {
        headers: new HttpHeaders().set('authorization', this._authHeader)
      })
      .catch(this._handleError);
  }


 // POST new event (admin only)
 filterTickers$(filterInput,endPoint) {
  return this.http
    .post(`${ENV.BASE_API}${endPoint}`, filterInput, {
      headers: new HttpHeaders().set('authorization', this._authHeader)
    })
    .catch(this._handleError);
}


  // PUT existing event (admin only)
  // editEvent$(id: number, event: TickerModel): Observable<TickerModel> {    
  //   return this.http
  //     .put(`${ENV.BASE_API}ticker/${id}`, event, {
  //       headers: new HttpHeaders().set('Authorization', this._authHeader)
  //     })
  //     .catch(this._handleError);
  // }
  editEvent$(id, event) {    
    return this.http
      .put(`${ENV.BASE_API}ticker/${id}`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  //Delete Ticker
  deleteTickerById$(id: number): Observable<number>{
    return this.http
      .delete(`${ENV.BASE_API}ticker/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse | any) {
    const errorMsg = err.message || 'Error: Unable to complete request.';
    if (err.message && err.message.indexOf('No JWT present') > -1) {
      this.router.navigate(['/auth/login']);
    }
    return Observable.throw(errorMsg);
  }

}

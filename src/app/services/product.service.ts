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
  public getToken(): string {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return this.currentUser.token;
  }

      //getHelpById$(createdBy: number): Observable<HelpModel> {
        getComposeById$(id: number) {
          return this.http
            .get(`${ENV.BASE_API}product/${id}`, {
              headers: new HttpHeaders().set('Authorization', this._authHeader)
            })
            .catch(this._handleError);
        }

           //delete insights-attachments
      deleteInsAttachmentById$(id: number): Observable<number>{
        return this.http
          .delete(`${ENV.BASE_API}insight-attachment/${id}`, {
            headers: new HttpHeaders().set('Authorization', this._authHeader)
          })
          .catch(this._handleError);
      }

  getproducts$() {
    return this.http
      .get(`${ENV.BASE_API}products`, {
        headers: new HttpHeaders().set('authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  removeFile(file){
    return this.http
      .delete(`${ENV.BASE_API}products/remove-file`, {
        headers: new HttpHeaders()
                  .set('Authorization', this._authHeader)
                  .set('file', file)
      })
      .catch(this._handleError);
  }


  // GET list of public, future events
  //getUserById$(id: number): Observable<ClientModel> {
    getUserById$(id: number) {
    return this.http
      .get(`${ENV.BASE_API}product/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  // POST new event (admin only)
    postEvent$(event) {
    return this.http
      .post(`${ENV.BASE_API}product`, event, {
        headers: new HttpHeaders().set('authorization', this._authHeader)
      })
      .catch(this._handleError);
  }


 // POST new event (admin only)
 filterProducts$(filterInput,endPoint) {
  return this.http
    .post(`${ENV.BASE_API}${endPoint}`, filterInput, {
      headers: new HttpHeaders().set('authorization', this._authHeader)
    })
    .catch(this._handleError);
}

  editEvent$(id, event) {    
    return this.http
      .put(`${ENV.BASE_API}product/${id}`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  //Delete Product
  deleteProductById$(id: number): Observable<number>{
    return this.http
      .delete(`${ENV.BASE_API}product/${id}`, {
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

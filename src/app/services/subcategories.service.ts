import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ENV } from '../env.config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { SubCategoryModel } from '../models/sub-category.model';
@Injectable()
export class SubcategoriesService {

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
  getsubSector$() {
    return this.http
      .get(`${ENV.BASE_API}subsectors`, {
        headers: new HttpHeaders().set('authorization', this._authHeader)
      })
      .catch(this._handleError);
  }
  
  // POST new event (admin only)
  getSubsector$(sector_id: number) {
    return this.http
      .get(`${ENV.BASE_API}subsector?sector_id=${sector_id}`, {
        headers: new HttpHeaders().set('authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  removeFile(file){
    return this.http
      .delete(`${ENV.BASE_API}lockers/remove-file`, {
        headers: new HttpHeaders()
                  .set('Authorization', this._authHeader)
                  .set('file', file)
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
  // POST new event (admin only)
postEvent$(event: SubCategoryModel): Observable<SubCategoryModel> {
  return this.http
    .post(`${ENV.BASE_API}subsector`, event, {
      headers: new HttpHeaders().set('authorization', this._authHeader)
    })
    .catch(this._handleError);
}
  // PUT existing event (admin only)
  editEvent$(id: number, event: SubCategoryModel): Observable<SubCategoryModel> {    
    return this.http
      .put(`${ENV.BASE_API}subsector/${id}`, event, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }
    // POST new event (admin only)
    filterSubSector$(filterInput,endPoint) {
      return this.http
        .post(`${ENV.BASE_API}${endPoint}`, filterInput, {
          headers: new HttpHeaders().set('authorization', this._authHeader)
        })
        .catch(this._handleError);
    }

  // GET list of public, future events
  //getSubSectorById$(id: number): Observable<SubSectorModel> {
    getSubSectorById$(id: number) {
    return this.http
      .get(`${ENV.BASE_API}subsector/${id}`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .catch(this._handleError);
  }

  deleteSubSectorById$(id:number):Observable<number>{
    return this.http
    .delete(`${ENV.BASE_API}subsector/${id}`, {
      headers: new HttpHeaders().set('authorization', this._authHeader)
    })
    .catch(this._handleError);
  }
}

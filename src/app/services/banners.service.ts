import { Injectable } from "@angular/core";

@Injectable()
export class BannersService {
    private currentUser : any;
    public getToken(): string {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.currentUser.token;
      }
}
import { Component, OnInit,OnDestroy } from '@angular/core';

import { Title } from '@angular/platform-browser';
//import { AuthService } from './../../../auth/auth.service';
import { ProductService } from '../../../services/product.service';
import { UtilsService } from '../../../services/utils.service';


import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ProductModel } from '../../../models/product.model';
import { BreadcrumbsService } from 'ng2-breadcrumbs';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  pageTitle = 'Update Event';
  routeSub: Subscription;
  private id: number;
  loading: boolean;
  tickerSub: Subscription;
  ticker: ProductModel;
  error: boolean;

  constructor(
    private route: ActivatedRoute,    
    private title: Title,
    private _tickerapi: ProductService,
    private breadcrumbsService:BreadcrumbsService,
    public utils: UtilsService
  ) { }

  ngOnInit() {

          /*BreadCrumb*/
          let bcList = [{label: 'Home' , url: 'home', params: []},{label: 'Tickers' , url: 'tickers', params: []},
          {label: 'Update' , url: 'update', params: []}];
        this.utils.changeBreadCrumb(bcList);
        this.utils.currentBSource.subscribe(list => {
          this.breadcrumbsService.store(list);
        });
        /*End - BreadCrumb*/
  

    this.title.setTitle(this.pageTitle);
    // Set event ID from route params and subscribe
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this._getTicker();
      });
  }


  private _getTicker() {
    this.loading = true;
    // GET event by ID
    this.tickerSub = this._tickerapi
      .getUserById$(this.id)
      .subscribe(
        res => {
          if(res.success){
            this.ticker = res.data; 
          }          
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    //this.tabSub.unsubscribe();
    this.tickerSub.unsubscribe();
  }

}

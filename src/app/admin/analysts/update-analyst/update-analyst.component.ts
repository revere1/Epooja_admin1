import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
//import { AuthService } from './../../../auth/auth.service';
import { UserService } from '../../../services/user.service';
import { UtilsService } from '../../../services/utils.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ClientModel } from '../../../models/client.model';
import { BreadcrumbsService } from 'ng2-breadcrumbs';

@Component({
  selector: 'app-update-analyst',
  templateUrl: './update-analyst.component.html',
  styleUrls: ['./update-analyst.component.css']
})
export class UpdateAnalystComponent implements OnInit {

  pageTitle = 'Update Event';
  routeSub: Subscription;
  private id: number;
  loading: boolean;
  clientSub: Subscription;
  client: ClientModel;
  error: boolean;

  constructor(
    private route: ActivatedRoute,    
    private title: Title,
    private _userapi: UserService,
    public utils: UtilsService,
    private breadcrumbsService:BreadcrumbsService,
  ) { }

  ngOnInit() {

         /*BreadCrumb*/
         let bcList = [{label: 'Home' , url: 'home', params: []},{label: 'Analysts' , url: 'analysts', params: []},
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
        this._getClient();
      });
  }

  private _getClient() {
    this.loading = true;
    // GET event by ID
    this.clientSub = this._userapi
      .getUserById$(this.id)
      .subscribe(
        res => {
          if(res.success){
            this.client = res.data;         
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
    this.clientSub.unsubscribe();
  }

}

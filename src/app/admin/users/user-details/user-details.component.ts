import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../../node_modules/ng2-breadcrumbs';
import { UtilsService } from '../../../services/utils.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  constructor(private breadcrumbsService:BreadcrumbsService,
              private _utils:UtilsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
      /*BreadCrumb*/
      let bcList = [{label: 'Home' , url: 'home', params: []},{label: 'Users' , url: 'users', params: []},
      {label: 'View of user '+this.id , url: 'view', params: []}];
    this._utils.changeBreadCrumb(bcList);
    this._utils.currentBSource.subscribe(list => {
      this.breadcrumbsService.store(list);
    });
    /*End - BreadCrumb*/
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

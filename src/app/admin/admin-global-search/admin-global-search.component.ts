import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/debounceTime';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Subscription } from 'rxjs';
import { ENV } from './../../env.config';

@Component({
  selector: 'app-admin-global-search',
  templateUrl: './admin-global-search.component.html',
  styleUrls: ['./admin-global-search.component.css']
})
export class AdminGlobalSearchComponent{

  routeSub: Subscription;
  public id: number; 
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  public searchResults = [];
  public hint: string = null;
  public showHint: boolean = true;
  public serverURL = ENV.SERVER_URL;

constructor(
    private _user: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stateCtrl = new FormControl();
    this.stateCtrl.valueChanges.subscribe(val => {
      this.filterStates(val)     
    })
    this.stateCtrl.setValue('');
  }
  ngOnInit() {
    this.routeSub = this.route.params
    .subscribe(params => {
      this.id = params['id']
    });
  }

  onInsSelectionChanged(item) {
    this.router.navigateByUrl(`/insights/compose/preview/`+item.id)
    this.stateCtrl.setValue('');
  }
 
  onSelectionChange(item){
    this.router.navigateByUrl(`/profile/`+item.id)
    this.stateCtrl.setValue('');
  }
  onTickerSelection(item){
    this.router.navigateByUrl(`/ticker/`+item.id)
    this.stateCtrl.setValue('');
  }
  filterStates(name: string) {
    this._user.globalSearch(name).subscribe(data => {
      if (data.success) {
        this.searchResults = [data.data];
      }
      else {
        this.searchResults = [];
        this.hint = data.message;
      }
    });
  }

}


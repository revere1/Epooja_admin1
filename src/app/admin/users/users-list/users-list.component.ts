import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public users:any[] = [];
  dtOptions: DataTables.Settings = {};
  
  apiEvents = [];
  constructor(
    private _utils: UtilsService,
    private _userService:UserService
  ) { }

  ngOnInit() {

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        var myEfficientFn = this._utils.debounce(()=>{           
           let apiEvent= this._userService.filterUsers$(dataTablesParameters,'filterUsers')
            .subscribe(resp => {
              that.users = resp.data;  
              console.log(that.users)
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            });   
            (this.apiEvents).push(apiEvent);      
        },1000,false);

        myEfficientFn();       
      },
      columns: [
            { data: 'user_name' },
            { data: 'user_email' },
            { data: 'status' },
            { data: 'createdAt' },
            { data: 'id' }
          ]
    };
  }

}

import { Component, OnInit, Input,OnDestroy } from '@angular/core';
import { MessagesService } from '../../../services/messages.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilsService } from '../../../services/utils.service';
import { ENV } from './../../../env.config';
import { UserService } from '../../../services/user.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
declare var $: any;
@Component({
  selector: 'app-admin-messages-form',
  templateUrl: './admin-messages-form.component.html',
  styleUrls: ['./admin-messages-form.component.css']
})
export class AdminMessagesFormComponent implements OnInit , OnDestroy {
  messagesData = [];
  messagesData1 = [];
  messageUserList = [];
  messagesData3 = [];
  userprofile : any;
  routeSub: Subscription;
  id: any;
  msgId: number;
  currentUserId = JSON.parse(localStorage.getItem('currentUser')).user.userid;
  apiEvents=[];
  public serverURL = ENV.SERVER_URL;
  public avatar: string = null;
  objLen: number = 5;
  dtOptions = {
    "draw": 1,
    "columns": [
      { "data": "message", "name": "", "searchable": true, "orderable": true, "search": { "value": "", "regex": false } },
      { "data": "first_name", "name": "", "searchable": true, "orderable": true, "search": { "value": "", "regex": false } },
      { "data": "last_name", "name": "", "searchable": true, "orderable": true, "search": { "value": "", "regex": false } },
      { "data": "id", "name": "", "searchable": true, "orderable": true, "search": { "value": "", "regex": false } },
      //{ "data": "sent_to", "name": "", "searchable": true, "orderable": true, "search": { "value": "", "regex": false } }
    ],
      "order": [
          { "column": "createdAt", "dir": "desc" }
      ],
      "start": 0,
      "length": this.objLen,
      "currentUserId" :this.currentUserId, 
      "search": { "value": "", "regex": false },
     
    };
  finished = false  // boolean when end of database is reached
  error: boolean;
  messages = [];
  switch: string = '';

  msgFilterForm: FormGroup = this.fb.group({
    quickFilter: [''],
  });

  constructor(private _messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router,
    private _utils: UtilsService,
    private _userapi: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getMessages();
    this.onChanges();
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id']
        this.messageById(params['id'])
      });
  }
  

  private messageById(id: any) {
       if( id == '' ){
        this.messagesData = [];
    }else{
    this.messagesData3 = [];
    let apiEvent = this._messagesService.messageById$(id).subscribe(data => {
      if(!data.data.length){
        this.router.navigateByUrl('/admin/messages/read');
      }
      this.messagesData = [];
      if (data.success === false) {
      } else {
        let uniqueThreads = [];
        if(data.data){
          (data.data).forEach(val=>{
            if(this._utils.inArray(val.id,uniqueThreads)){              
              let key = this._utils.isKeyExistsForVal(val.id,this.messagesData);
              if(key !== -1){
                (this.messagesData[key].messageFiles).push({'path':val.path,'orgName':val.orgName});
              }
            }
            else{
              let temp = val;
              temp.messageFiles = val.path ? [{'path':val.path,'orgName':val.orgName}] : [];
              (this.messagesData).push(temp);
              uniqueThreads.push(val.id);
            }
          })
        } 
      }
    });
    (this.apiEvents).push(apiEvent);
  }
  }
  refresh(id,index){
    $(document).ready(() => {
      let that = this
      $('#relistitem'+id).remove();
      $('#countRemove' + index).remove();
      $('#border' + index).removeAttr('style')
      $('#rcount ,#rcounthead').each(function(){
        $(this).text(function (v, n) {
          if (JSON.parse(n) != 0) {
            return JSON.parse(n) - 1;
          } else {
            return 0;
          }
        });
      })
    })
    this.messageById(id); 
  }
  onChanges() {
    this.msgFilterForm.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(val => {
        this.dtOptions.search = { "value": val.quickFilter, "regex": false };
        this.dtOptions.start = 0;
        this.dtOptions.length = this.objLen;
        this.finished = false;
        this.messages= [];    
        this.getMessages();
      });
  }
  private _getUser() {
    this._userapi
      .getUserById$(this.currentUserId)
      .subscribe(
        res => {
          if (res.success) {
            this.userprofile = res.data;
            this.avatar = this.serverURL + this.userprofile.profile_pic;
          }
        },
        err => {
          this.error = true;
        }
      );
  }
  onScroll() {
    this.dtOptions.start += this.objLen;
    this.getMessages();
  }

  private getMessages(append = true) {
    if (this.finished) return;
    this._messagesService
      .filterMessages$(this.dtOptions, 'filter-messages')
      .subscribe(data => {
        if (data.data.length !== this.objLen) {
          this.finished = true;
        }
        this.messages = (this.messages).concat(data.data);
      })
  }
  onNotify(message: string): void {
    this.messagesData3.push(message)
  }

  public ngOnDestroy(){ 
    if((this.apiEvents).length){
      this.apiEvents.forEach(val=>{
        val.unsubscribe();
      })
    }  
  }
  
}

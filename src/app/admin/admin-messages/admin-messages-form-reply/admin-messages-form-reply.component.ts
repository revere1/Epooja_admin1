import { Component, OnInit,Input,Output } from '@angular/core';
import { AdminMessageModel, AdminMessageFormModel } from '../../../models/admin-message.module';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MessagesService } from '../../../services/messages.service';
import { ToastsManager } from 'ng2-toastr';
import { MessagesFormService } from '../../../services/messages/messages-form.service';
import {EventEmitter} from '@angular/core'
import { ENV } from '../../../env.config';
import { ComposeService } from '../../../services/compose.service';
import { UtilsService } from '../../../services/utils.service';
declare var $: any;
@Component({
  selector: 'app-admin-messages-form-reply',
  templateUrl: './admin-messages-form-reply.component.html',
  styleUrls: ['./admin-messages-form-reply.component.css']
})
export class AdminMessagesFormReplyComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();
  @Input() event: AdminMessageModel;
  private subscription: Subscription;
  private messages = [];
  data : any;
  adminMessageForm: FormGroup;
  isEdit: boolean;
  apiEvents = [];
  // Model storing initial form values
  formEvent: AdminMessageFormModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  id: any;
  // Form submission
  submitEventObj: AdminMessageModel;
  submitting: boolean;
  submitEventSub: Subscription;
  error: boolean;
  submitBtnText: string;
  routeSub: Subscription;
  messagesData:any;
  msgId:number;
  tickerInd = ENV['$'];
  analystInd = ENV['@'];
  InsightInd = ENV['#'];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private utils : UtilsService,
    private route: ActivatedRoute,
    private _messagesService: MessagesService,
    private mf:MessagesFormService,
    public toastr: ToastsManager
  ) {
    this.adminMessageForm = new FormGroup({
      message: new FormControl()
   });
  }

  ngOnInit(){ 
    this.routeSub = this.route.params
    .subscribe(params => {
      this.latestMessage(params['id'])
    }); 
   this.formErrors=this.mf.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Send';
    this.formEvent = this._setFormEvent();
    $(document).ready(() => {
      let _that = this;
      $('#message').summernote({
          toolbar: ENV.SUMMER_SETUP.toolbar,
          callbacks:{
            onCreateLink: function (originalLink) {
              return originalLink; // return original link 
            },
            onImageUpload: function (files) {
              _that.uploadFile(files, this);
            },
          },
          hint:_that.utils.hint()
      });
    });
  }
  uploadFile(files, editor) {
    {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("userphoto", files[i], files[i]['name']);
      }
      this._messagesService.uploads(formData).subscribe(res => {
        if (res.success) {
          res.data.forEach(path => {
            $(editor).summernote('insertImage', ENV.SERVER_URL + path, '');
          })
        }
      });
    }
  }
  private latestMessage(id :  any){
    if( id == '' ){
    }else{
    this._messagesService.latestMessageById$(id).subscribe(data => {
      if (data.success === false) {
      } else {
        this.messagesData = data.data;
      }
    });
  }
  } 
 private_buildForm(){
  let validRules={
   description:[this.formEvent.message,[
     //Validators.required
    ]]
  };

  this.adminMessageForm=this.fb.group(validRules);
  //Subscribetoformvaluechanges
  let apiEvent=this.formChangeSub=this.adminMessageForm
    .valueChanges
    .subscribe(data=>this._onValueChanged());
    (this.apiEvents).push(apiEvent);
  if(this.isEdit){
    const _markDirty=group=>{
      for(const i in group.controls){
        if(group.controls.hasOwnProperty(i)){
          group.controls[i].markAsDirty();
        }
      }
    };
    _markDirty(this.adminMessageForm);
  }
  this._onValueChanged();
}
private _onValueChanged() {
  if (!this.adminMessageForm) { return; }
  const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
    if (control && control.dirty && control.invalid) {
      const messages = this.mf.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + '<br>';
        }
      }
    }
  };
  // Check validation and set errors
  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      this.formErrors[field] = '';
      _setErrMsgs(this.adminMessageForm.get(field), this.formErrors, field);
    }
  }
}
  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new AdminMessageFormModel(null, null,null,null,null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      return new AdminMessageFormModel(
        this.event.message,
        this.event.parent,
        this.event.is_read,
        this.event.sent_to,
        this.event.sent_from
      );
    }
  }
  private _getSubmitObj() {
    let curUserObj = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(curUserObj);
    return new AdminMessageModel(
      $('#message').summernote('code'),
      (this.messagesData.parent)?this.messagesData.parent:this.messagesData.id,
      0,
      (this.messagesData.sent_from == currentUser.user.userid)?this.messagesData.msgrecipient.sent_to:this.messagesData.sent_from,
      currentUser.user.userid
      // this.event ? this.event.id : this.id ,
    );
  }
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    if (res.success) {
      this.toastr.success(res.message, 'Success');
      $("#message").summernote("reset");
    }
    else {
      this.toastr.error(res.message, 'Invalid');
    }
  }
  private _handleSubmitError(err) {
    this.toastr.error(err.message, 'Error');
    this.submitting = false;
    this.error = true;
  }
  saveMessages() {
    this.routeSub = this.route.params
    .subscribe(params => {
      this.id = params['id'];
    });
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();
    if (!this.isEdit) {
      this.submitEventSub = this._messagesService
      .postEventForReply$(this.id, this.submitEventObj)
      .subscribe(
        data => {
          this.notify.emit({'msg':data.data.message,'createdAt':data.data.createdAt});
          this._handleSubmitSuccess(data);
        },
        err => this._handleSubmitError(err)
      );
      // (this.apiEvents).push(apiEvent);
    } else {

    }
  }
  // public ngOnDestroy() {
  //   if ((this.apiEvents).length) {
  //     this.apiEvents.forEach(val => {
  //       val.unsubscribe();

  //     })
  //   }
  // }
}




 

  


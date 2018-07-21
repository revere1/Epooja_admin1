import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MessagesModel, MessagesFormModel } from './../../../models/messages.model';
import { Subscription } from 'rxjs/Subscription';
import { MessagesFormService } from './../../../services/messages/messages-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MessagesService } from '../../../services/messages.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper/dist/lib/dropzone.interfaces';
import { ENV } from './../../../env.config';
import { UtilsService } from '../../../services/utils.service';
import { UserService } from '../../../services/user.service';
declare var $: any;


@Component({
  selector: 'app-admin-messages-form-create',
  templateUrl: './admin-messages-form-create.component.html',
  styleUrls: ['./admin-messages-form-create.component.css']
})
export class AdminMessagesFormCreateComponent implements OnInit {
  @Input() event: MessagesModel;
  messageForm: FormGroup;
  private routeSub: any;
  isEdit: boolean;
  apiEvents = [];
  // Model storing initial form values
  formEvent: MessagesFormModel;
  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;
  id: any;
  // Form submission
  submitEventObj: MessagesModel;
  submitting: boolean;
  submitEventSub: Subscription;
  error: boolean;
  submitBtnText: string;
  users = [];
  public user: any;
  users1: object[];
  private sent_todata = [];
  uploadFilesObj = {};
  uploadFiles = [];
  canRemove: boolean = true;
  public config: DropzoneConfigInterface = {};
  tickerInd = ENV['$'];
  analystInd = ENV['@'];
  InsightInd = ENV['#'];
  private tryingToPaste = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private _userapi: UserService,
    public mf: MessagesFormService,
    private _messagesService: MessagesService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.id = this._messagesService.getCurUserId();
    this.formErrors = this.mf.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Send';
    this.formEvent = this._setFormEvent();
    this._buildForm();
    let that = this;
    $(document).ready(() => {
      $('#message').summernote({
        toolbar: ENV.SUMMER_SETUP.toolbar,
        callbacks: {
          onPaste: function (e) {
            that.tryingToPaste = true;
            console.log('Called event paste');
          },
          onCreateLink: function (originalLink) {
            return originalLink; // return original link 
          },
          onImageUpload: function (files) {
            if (that.tryingToPaste) {
              that.tryingToPaste = false;
              return false;
            }
            else
              that.uploadFile(files, this);
          },
        },
        hint: that.utils.hint()
      });
      let select2Obj = $("#sent_to").select2({
        minimumInputLength: 2,
        ajax: {
          url: ENV.BASE_API + "auto-search-users?token=" + that._messagesService.getToken(),
          dataType: 'json',
          data: function (params) {
            return {
              p: params.term, // search term
              page: params.page
            };
          },
          processResults: function (data, params) {
            var data = $.map(data, function (obj) {
              obj.id = obj.id;
              obj.text = obj.sku;
              return obj;
            });
            params.page = params.page || 1;
            return {
              results: data,
              pagination: {
                more: (params.page * 30) < data.total_count
              }
            };
          },
          cache: true
        },
        escapeMarkup: function (markup) {
          return markup;
        }, // let our custom formatter work
      });
      select2Obj.on("select2:select", function (e) {
        that.messageForm.patchValue({ 'id': e.params.data.id });
      });
    });
    this.routeSub = this.route.params
      .subscribe(params => {
        this.id = params['id'];
      });
    this._userapi.getUserById$(this.id).subscribe(data => {
      if (data.success === false) {
        this.router.navigate(['/admin/messages/create'])
      }
      else {
        this.user = data.data;
        $("#sent_to").empty().append(`<option value="${this.user.id}">${this.user.first_name} ${this.user.last_name}</option>`).val(`${this.user.id}`).trigger('change');
        this.messageForm.patchValue({ 'id': this.user.id });
      }
    });

    this.config = {
      url: ENV.BASE_API + 'messages/path?token=' + this._messagesService.getToken(),
      maxFiles: ENV.HELP_MAX_FILES,
      clickable: true,
      createImageThumbnails: true,
      addRemoveLinks: true,
      init: function () {
        let drop = this;
        this.on('removedfile', function (file) {
          /*If reupload already existed file, don t delet the file if max lik=mit crossed error uploaded*/
          if (file.status === 'error') {
            let index = (that.uploadFiles).indexOf(that.uploadFilesObj[file.upload.uuid]);
            if (index > -1) {
              return false;
            }
          }
          /*end*/
          if (that.canRemove) {
            //Removing values from array which are existing in uploadFiles variable         
            let index = (that.uploadFiles).indexOf(that.uploadFilesObj[file.upload.uuid]);
            if (index > -1) {
              if (that.uploadFiles.length === ENV.HELP_MAX_FILES) {
                that.formErrors['files'] = '';
                that._setErrMsgs(that.messageForm.get('files'), that.formErrors, 'files');
              }
              (that.uploadFiles).splice(index, 1);
              that.removeFile(that.uploadFilesObj[file.upload.uuid]);
              delete that.uploadFilesObj[file.upload.uuid];
            }
          }
        });
        this.on('error', function (file, errorMessage) {
          drop.removeFile(file);
        });
        this.on('success', function (file) {
        });
      }
    };
  }
  private removeFile(file) {
    let apiEvent = this._messagesService.removeFile(file).subscribe(
      data => {
        this._handleSubmitSuccess(data);
      },
      err => this._handleSubmitError(err)
    );
    (this.apiEvents).push(apiEvent);
  }
  public onUploadSuccess(eve) {
    if ((eve[1].success !== undefined) && eve[1].success) {
      this.formErrors['files'] = '';
      Object.assign(this.uploadFilesObj, { [eve[0].lastModified]: eve[1].data });
      (this.uploadFiles).push(eve[1].data);
    }
    else {
      this.formErrors['files'] = 'Something Went Wrong';
    }
    this._setErrMsgs(this.messageForm.get('files'), this.formErrors, 'files');
  }
  public onUploadError(eve) {
    this.formErrors['files'] = eve[1];
    this._setErrMsgs(this.messageForm.get('files'), this.formErrors, 'files');
  }
  private _buildForm() {
    let validRules = {
      sent_to: [this.formEvent.sent_to, [
        // Validators.required
      ]],
      message: [this.formEvent.message, [
        // Validators.required
      ]],
      subject: [this.formEvent.subject, [
        Validators.required
      ]]
    };
    this.messageForm = this.fb.group(validRules);
    // Subscribe to form value changes
    let apiEvent = this.formChangeSub = this.messageForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    (this.apiEvents).push(apiEvent);
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.messageForm);
    }
    this._onValueChanged();
  }
  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new MessagesFormModel(null, null, null, null, null, []);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data
      return new MessagesFormModel(
        this.event.sent_to,
        this.event.subject,
        this.event.message,
        this.event.sent_from,
        this.event.parent,
        this.event.files,
      );
    }
  }
  private _onValueChanged() {
    if (!this.messageForm) { return; }
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        this._setErrMsgs(this.messageForm.get(field), this.formErrors, field);
      }
    }
  }
  _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
    if (control && control.dirty && control.invalid) {
      const messages = this.mf.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + '<br>';
        }
      }
    }
  };
  resetForm() {
    this.messageForm.reset();
    $("#sent_to").select2("val", "");
    $("#message").summernote("reset");
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
  private _getSubmitObj() {
    let curUserObj = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(curUserObj);
    // for (var i = 0; i < $('#sent_to').select2('data').length; i++) {
    //   this.users1 = $('#sent_to').select2('data')[i].id.split(':')[1]
    //   this.sent_todata.push(this.users1)
    // }
    return new MessagesModel(
      // this.users1 = $('#sent_to').select2('data')[i].id.split(':')[1],
      $('#sent_to').select2('data')[0].id,
      this.messageForm.get('subject').value,
      $('#message').summernote('code'),
      currentUser.user.userid,
      null,
      this.event ? this.event.files : this.uploadFiles,
      this.event ? this.event.id : null,
    );
  }
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    if (res.success) {
      this.toastr.success(res.message, 'Success');
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
    if ($('#sent_to').select2('data').length <= 0) {
      this.formErrors['sent_to'] = this.mf.validationMessages['sent_to'].required;
      this._setErrMsgs(this.messageForm.get('sent_to'), this.formErrors, 'sent_to');
      return false;
    }
    else {
      this.formErrors['sent_to'] = '';
      this._setErrMsgs(this.messageForm.get('sent_to'), this.formErrors, 'sent_to');
    }
    if ($('#message').summernote('isEmpty')) {
      this.formErrors['message'] = this.mf.validationMessages['message'].required;
      this._setErrMsgs(this.messageForm.get('message'), this.formErrors, 'message');
      return false;
    }
    else {
      this.formErrors['message'] = '';
      this._setErrMsgs(this.messageForm.get('message'), this.formErrors, 'message');
    }
    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();
    if (!this.isEdit) {
      let apiEvent = this.submitEventSub = this._messagesService
        .postEvent$(this.submitEventObj)
     
        .subscribe(
          data => {
            console.log(this.submitEventObj)
            this._handleSubmitSuccess(data);
           
            this.canRemove = false;
            this.router.navigate(['/admin/messages/read/'])
          },
          err => this._handleSubmitError(err)
        );
      (this.apiEvents).push(apiEvent);
    }
  }
  public ngOnDestroy() {
    if ((this.apiEvents).length) {
      this.apiEvents.forEach(val => {
        val.unsubscribe();
      })
    }
  }
}

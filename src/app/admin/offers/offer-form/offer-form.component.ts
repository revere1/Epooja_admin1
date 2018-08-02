import { Component, OnInit, Input, ViewChild, OnDestroy, Output, NgModule, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { ProductFormService } from './../../../services/products/product-form.service';
import { ProductService } from './../../../services/product.service';
import { OfferModel, FormOfferModel } from './../../../models/offer.model';
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from './../../../services/categories.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ENV } from './../../../env.config';
import { SubcategoriesService } from './../../../services/subcategories.service';
declare var $: any;

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit {

  @Input() event: OfferModel;
  @ViewChild('fileInput') fileInput;
  isEdit: boolean;
  offerForm: FormGroup;
  public serverURL = ENV.SERVER_URL
  apiEvents = [];
  products = [];
  formEvent: FormOfferModel;
  formErrors: any;
  formChangeSub: Subscription;
  submitEventObj: OfferModel;
  submitting: boolean;
  submitEventSub: Subscription;
  error: boolean;
  offersData: any;
  submitBtnText: string;
  categories: Object[];
  subcategories: Object[];
  uploadFilesObj = {};
  uploadFiles = [];
  product_img: any;
  routeSub: Subscription;
  public id: number;
  canRemove: boolean = true;
  finished: boolean = false;
  public config: DropzoneConfigInterface = {};
  public totalsize: number = 0.0;

  constructor(private fb: FormBuilder,
    private router: Router,
    public cf: ProductFormService,
    private _productapi: ProductService,
    private route: ActivatedRoute,
    private _categoryService: CategoriesService,
    private _subcategoriesService: SubcategoriesService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    $(document).ready(() => {
      let _that = this;
      $('#offer_description').summernote({
      });
    });
    this.routeSub = this.route.params
    .subscribe(params => {
      this.id = params['id'];
    });
  
    let apiEvent = this._productapi.getComposeById$(this.id).subscribe(data =>  {
      if (data.success === false) {
      }
      else {
        this.finished = true;
        this.offersData = data.data;
        // this.product_img = (this.productsData.product_img) ? ENV.SERVER_URL + this.productsData.product_img : null;   
        // this.productsData.product_attachements.forEach(ele => {
        //   this.totalsize += parseFloat(ele.fsize);
        // });
        
      }
      });

    this.formErrors = this.cf.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Create';
    this.formEvent = this._setFormEvent();
    this._buildForm();
    let that = this;
    this.config = {
      url: ENV.BASE_API + 'products/path?token=' + this._productapi.getToken(),
      maxFiles: ENV.PRODUCT_MAX_FILES,
      maxFilesize: ENV.HELP_MAX_SIZE,
      clickable: true,
      createImageThumbnails: true,
      addRemoveLinks: true,
      init: function () {
        let drop = this;
        this.on("addedfile", function (file) {
          that.totalsize += parseFloat((file.size / (1000 * 1000)).toFixed(2));
        });
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

            that.totalsize -= parseFloat((file.size / (1000 * 1000)).toFixed(2));
            //Removing values from array which are existing in uploadFiles variable         
            let index = (that.uploadFiles).indexOf(that.uploadFilesObj[file.upload.uuid]);
            if (index > -1) {
              if (that.uploadFiles.length === ENV.PRODUCT_MAX_FILES) {
                that.formErrors['files'] = '';
                that._setErrMsgs(that.offerForm.get('files'), that.formErrors, 'files');
              }
              (that.uploadFiles).splice(index, 1);
              //that.removeFile(that.uploadFilesObj[file.upload.uuid]);
              //delete that.uploadFilesObj[file.upload.uuid];
            }
          }
        });
        this.on('error', function (file, errorMessage) {
          drop.removeFile(file);
        });
        this.on('success', function (file) {
        });
      },
      /* Check for total all files size*/
      accept: function (file, done) {
        if (that.totalsize <= ENV.HELP_MAX_SIZE) {
          done();
        } else {
          done('Total size exceeded');
        }
      }
    };
    this._buildForm();
  }

  public onUploadSuccess(eve) {
    if ((eve[1].success !== undefined) && eve[1].success) {
      this.formErrors['files'] = '';
      console.log(this.uploadFiles)
      Object.assign(this.uploadFilesObj, { [eve[0].upload.uuid]: eve[1].data });
      (this.uploadFiles).push(eve[1].data);
    }
    else {
      this.formErrors['files'] = 'Something Went Wrong';
    }
    this._setErrMsgs(this.offerForm.get('files'), this.formErrors, 'files');
  };
  public onUploadError(eve) {
    this.formErrors['files'] = eve[1];
    this._setErrMsgs(this.offerForm.get('files'), this.formErrors, 'files');
  };

  private _buildForm() {
    let validRules = {
      offer_name: [this.formEvent.offer_name, [
        Validators.required
      ]],
      offer_code:  [this.formEvent.offer_code, [
        Validators.required
      ]],
      offer_description: [this.formEvent.offer_description, [
      ]],
      discount_type: [this.formEvent.discount_type, [
        Validators.required
      ]],
      discount_value:[this.formEvent.discount_value, Validators.pattern["0-9*"]],
      limit: [this.formEvent.limit, Validators.pattern["0-9*"]],
      limit_value: [this.formEvent.limit_value, Validators.pattern["0-9*"]],
      status: [this.formEvent.status, [
        Validators.required
      ]]
    };
    this.offerForm = this.fb.group(validRules);

    // Subscribe to form value changes
    this.formChangeSub = this.offerForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.offerForm);
    }
    this._onValueChanged();
  }
  private _onValueChanged() {
    if (!this.offerForm) { return; }
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        this._setErrMsgs(this.offerForm.get(field), this.formErrors, field);
      }
    }
  }
  _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
    if (control && control.dirty && control.invalid) {
      const messages = this.cf.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          errorsObj[field] += messages[key] + '<br>';
        }
      }
    }
  };


  // private removeFile(file) {
  //   let apiEvent = this._productapi.removeFile(file).subscribe(
  //     data => {
  //       this._handleSubmitSuccess(data);
  //     },
  //     err => this._handleSubmitError(err)
  //   );
  //   (this.apiEvents).push(apiEvent);
  // }
  
  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new FormOfferModel(null,null, null, null,null,null,null,null,[]);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data

      return new FormOfferModel(
        this.event.offer_name,
        this.event.offer_code,
        this.event.offer_description,
        this.event.discount_type,
        this.event.discount_value,
        this.event.limit,
        this.event.limit_value,
        this.event.status,
        this.event.files,
        
      
      );
    }
  }

  private _getSubmitObj() {
    let curUserObj = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(curUserObj);

    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new OfferModel(
      this.offerForm.get('offer_name').value,
      this.offerForm.get('offer_code').value,
      $('#offer_description').summernote('code'),
      this.offerForm.get('discount_type').value,
      this.offerForm.get('discount_value').value,
      this.offerForm.get('limit').value,
      this.offerForm.get('limit_value').value,
      this.offerForm.get('status').value,
      this.event ? this.event.files : this.uploadFiles,
      this.event ? this.event.id : null,
    );
  }

  saveOffer() {
    if ($('#offer_description').summernote('isEmpty')) {
      this.formErrors['offer_description'] = this.cf.validationMessages['offer_description'].required;
      this._setErrMsgs(this.offerForm.get('offer_description'), this.formErrors, 'offer_description');
      return false;
    }
    else {
      this.formErrors['offer_description'] = '';
      this._setErrMsgs(this.offerForm.get('offer_description'), this.formErrors, 'offer_description');
    }

    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();
    console.log(this.submitEventObj);
    // let fileBrowser = this.fileInput.nativeElement;
    // let formData = new FormData();
    // if (fileBrowser.files && fileBrowser.files[0]) {
    //   formData.append("insight_img", this.fileInput.nativeElement.files[0], this.fileInput.nativeElement.files[0].name);
    // }
    // for (let k in this.submitEventObj) {
    //   formData.append(k, this.submitEventObj[k]);
    // }
    if (!this.isEdit) {
      let apiEvent = this.submitEventSub = this._productapi
        .postEvent$(this.submitEventObj)
        .subscribe(
          data => {
            this._handleSubmitSuccess(data);
            this.canRemove = false;
            //this.router.navigate(['/analyst/help']);
          },
          err => this._handleSubmitError(err)
        );
      (this.apiEvents).push(apiEvent);
    } else {
      this.submitting = true;
      this.submitEventObj = this._getSubmitObj();
      let fileBrowser = this.fileInput.nativeElement;
      let formData = new FormData();
      if (fileBrowser.files && fileBrowser.files[0]) {
        formData.append("product_img", this.fileInput.nativeElement.files[0], this.fileInput.nativeElement.files[0].name);
      }
      for (let k in this.submitEventObj) {
        formData.append(k, this.submitEventObj[k]);
      }
      console.log(this.submitEventObj)
      this.submitEventSub = this._productapi
     
        .editEvent$(this.event.id, formData)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  deleteProductAttachment(id: number, fsize: number) {
    var delmsg = confirm("Are u Sure Want to delete?");
    if (delmsg) {
      let apiEvent = this._productapi.deleteProductAttachmentById$(id)
        .subscribe(
          data => {
            this._handleSubmitSuccess1(data, id);
          },
          err => this._handleSubmitError(err)
        );
      (this.apiEvents).push(apiEvent);
      //this.totalsize = this.totalsize - fsize;
    }

  }

  private _handleSubmitSuccess1(res, id = 0) {
    this.error = false;
    // Redirect to event detail
    if (res.success) {
      this.toastr.success(res.message, 'Success');
      let pos = this.products.map(function (e) { return e.id; }).indexOf(id);
      this.products.splice(pos, 1);
    }
    else {
      this.toastr.error(res.message, 'Invalid');
    }
  }
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    if (res.success) {
      this.toastr.success(res.message, 'Success');
      this.router.navigate(['/admin/products']);
    }
    else {
      this.toastr.error(res.message, 'Invalid');
    }
  }

  private _handleSubmitError(err) {
    this.toastr.error(err.message, 'Error');
    this.submitting = false;
    this.error = true;
  };
  resetForm() {
    this.offerForm.reset();
  };

  ngOnDestroy() {
    if (this.submitEventSub) {
      this.submitEventSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }

}


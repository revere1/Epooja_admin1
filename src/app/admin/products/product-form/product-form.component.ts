import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { ProductFormService } from '../../../services/tickers/product-form.service';
import { ProductService } from '../../../services/product.service';
import { ProductModel, FormProductModel } from '../../../models/product.model';
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from '../../../services/categories.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ENV } from '../../../env.config';
import { SubcategoriesService } from '../../../services/subcategories.service';
declare var $: any;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() event: ProductModel;
  isEdit: boolean;
  productForm: FormGroup;
  apiEvents = [];
  formEvent: FormProductModel;
  formErrors: any;
  formChangeSub: Subscription;
  submitEventObj: ProductModel;
  submitting: boolean;
  submitEventSub: Subscription;
  error: boolean;
  submitBtnText: string;
  categories: Object[];
  subcategories: Object[];
  uploadFilesObj = {};
  uploadFiles = [];
  canRemove: boolean = true;
  public config: DropzoneConfigInterface = {};

  constructor(private fb: FormBuilder,
    private router: Router,
    public cf: ProductFormService,
    private _productapi: ProductService,
    private _categoryService: CategoriesService,
    private _subcategoriesService: SubcategoriesService,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    $(document).ready(() => {
      let _that = this;
      $('#product_description').summernote({
      });
    });
    this.formErrors = this.cf.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Create';
    this.formEvent = this._setFormEvent();
    this._buildForm();
    this._categoryService.getCategory$().subscribe(data => {
      if (data.success === false) {
      } else {
        this.categories = data.data;
      }
    });
    //Fetch Countries
    this._subcategoriesService.getSubcategories$().subscribe(data => {
      if (data.success === false) {
      } else {
        this.subcategories = data.data;
        console.log(this.subcategories)
      }
    });
    let that = this;
    this.config = {
      url: ENV.BASE_API + 'products/path?token=' + this._productapi.getToken(),
      maxFiles: ENV.LOCKER_MAX_FILES,
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
              if (that.uploadFiles.length === ENV.LOCKER_MAX_FILES) {
                that.formErrors['files'] = '';
                that._setErrMsgs(that.productForm.get('files'), that.formErrors, 'files');
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
          $('.btn-group').addClass('open');
        });
      }
    };
  }
  private _buildForm() {
    let validRules = {
      product_name: [this.formEvent.product_name, [
        Validators.required
      ]],
      category: [this.formEvent.category_id,
      Validators.required
      ],
      subcategory: [this.formEvent.subcategory_id],
      product_description: [this.formEvent.product_description, [
        // Validators.required
      ]],
      cost: [this.formEvent.cost, Validators.pattern["0-9*"]],
      quatity: [this.formEvent.quatity, Validators.pattern["0-9*"]],
    };
    this.productForm = this.fb.group(validRules);

    // Subscribe to form value changes
    this.formChangeSub = this.productForm
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
      _markDirty(this.productForm);
    }
    this._onValueChanged();
  }
  private _onValueChanged() {
    if (!this.productForm) { return; }
    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        this.formErrors[field] = '';
        this._setErrMsgs(this.productForm.get(field), this.formErrors, field);
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

  public onUploadSuccess(eve) {
    if ((eve[1].success !== undefined) && eve[1].success) {
      this.formErrors['files'] = '';
      Object.assign(this.uploadFilesObj, { [eve[0].upload.uuid]: eve[1].data });
      (this.uploadFiles).push(eve[1].data);
    }
    else {
      this.formErrors['files'] = 'Something Went Wrong';
    }
    this._setErrMsgs(this.productForm.get('files'), this.formErrors, 'files');
  }

  public onUploadError(eve) {
    this.formErrors['files'] = eve[1];
    this._setErrMsgs(this.productForm.get('files'), this.formErrors, 'files');
  }
  private removeFile(file) {
    let apiEvent = this._productapi.removeFile(file).subscribe(
      data => {
        this._handleSubmitSuccess(data);
      },
      err => this._handleSubmitError(err)
    );
    (this.apiEvents).push(apiEvent);
  }
  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      return new FormProductModel(null,null, null, null,null,null,null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data

      return new FormProductModel(
        this.event.product_name,
        this.event.category_id,
        this.event.subcategory_id,
        this.event.product_description,
        this.event.path,
        this.event.cost,
        this.event.quatity,
        
      
      );
    }
  }

  private _getSubmitObj() {
    let curUserObj = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(curUserObj);

    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new ProductModel(
      this.productForm.get('product_name').value,
      this.productForm.get('category').value,
      this.productForm.get('subcategory').value,
      $('#product_description').summernote('code'),
      this.event ? this.event.path : this.uploadFiles[0],
      this.productForm.get('cost').value,
      this.productForm.get('quatity').value,
      this.event ? this.event.id : null
    );
  }

  saveProduct() {
    if ($('#product_description').summernote('isEmpty')) {
      this.formErrors['product_description'] = this.cf.validationMessages['product_description'].required;
      this._setErrMsgs(this.productForm.get('product_description'), this.formErrors, 'product_description');
      return false;
    }
    else {
      this.formErrors['summary'] = '';
      this._setErrMsgs(this.productForm.get('product_description'), this.formErrors, 'product_description');
    }

    this.submitting = true;
    this.submitEventObj = this._getSubmitObj();
    console.log(this.submitEventObj);
    if (!this.isEdit) {
      this.submitEventSub = this._productapi
        .postEvent$(this.submitEventObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitEventSub = this._productapi
        .editEvent$(this.event.id, this.submitEventObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
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
    this.productForm.reset();
  };

  ngOnDestroy() {
    if (this.submitEventSub) {
      this.submitEventSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }

}

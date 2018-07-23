import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SectorFormService } from '../../../services/sectors/sector-form.service';
import { CategoriesModel, FormCategoriesModel } from '../../../models/categories.model';
import { ToastsManager } from 'ng2-toastr';
import { CategoriesService } from '../../../services/categories.service';
import { Router } from '@angular/router';
import { SubsectorsService } from '../../../services/subsectors.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class SectorFormComponent implements OnInit {

  @Input() event: CategoriesModel;

  sectorForm: FormGroup;
  isEdit: boolean;
  //Modelstoringinitialformvalues
  formEvent: FormCategoriesModel;

  //Formvalidationanddisabledlogic
  formErrors: any;
  formChangeSub: Subscription;

  //Formsubmission
  submitEventObj: FormCategoriesModel;
  submitting: boolean;
  submitEventSub: Subscription;
  error: boolean;
  submitBtnText: string;



  constructor(
    private fb: FormBuilder,
    public sc: SectorFormService,
    private _subsectorService: SubsectorsService,
    private router: Router,
    public toastr: ToastsManager,
    private _sectorsService: CategoriesModel,
  ) {
    this.sectorForm = new FormGroup({
      name: new FormControl(),
      status: new FormControl()
    });
  }

  ngOnInit() {
    this.formErrors = this.sc.formErrors;
    this.isEdit = !!this.event;
    this.submitBtnText = this.isEdit ? 'Update' : 'Create';

    this.formEvent = this._setFormEvent();
    this._buildForm();
  }
  private _buildForm() {
    let validRules = {
      name: [this.formEvent.category, [
        Validators.required
      ]],
      status: [this.formEvent.status, [
        Validators.required
      ]]
    };

    this.sectorForm = this.fb.group(validRules);
    // Subscribe to form value changes
    this.formChangeSub = this.sectorForm
      .valueChanges
      .subscribe(data => this._onValueChanged());
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.sectorForm);
    }
    this._onValueChanged();
  }



  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data



      return new FormCategoriesModel(null, null, null, null,null);
    } else {
      // If editing existing event, create new
      // FormEventModel from existing data

      return new FormCategoriesModel(
        this.event.category,
        this.event.cat_desc,
        this.event.cat_img,
        this.event.status,
        this.event.created_on
        

      );
    }
  }


  private _onValueChanged() {
    if (!this.sectorForm) { return; }
    const _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.sc.validationMessages[field];
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
        _setErrMsgs(this.sectorForm.get(field), this.formErrors, field);
      }
    }
  }


  resetForm() {
    this.sectorForm.reset();
  }

  private _getSubmitObj() {
    let curUserObj = localStorage.getItem('currentUser');
    let currentUser = JSON.parse(curUserObj);

    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    // return new CategoriesModel(
    //   this.sectorForm.get('category').value,
    //   this.sectorForm.get('status').value,
    //   this.event ? this.event.created_on : currentUser.user.userid,
    //   currentUser.user.userid,
    //   this.event ? this.event.id : null
    // );
  }
  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    if (res.success) {
      this.toastr.success(res.message, 'Success');
      this.router.navigate(['/admin/sectors']);
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

  saveCategory() {
    this.submitting = true;

    // this.submitEventObj = this._getSubmitObj();

    if (!this.isEdit) {

      // this.submitEventSub = this._sectorsService
      //   .postEvent$(this.submitEventObj)
      //   .subscribe(
      //     data => this._handleSubmitSuccess(data),
      //     err => this._handleSubmitError(err)
      //   );

    } else {

      // this.submitEventSub = this._sectorsService
      //   .editEvent$(this.event.id, this.submitEventObj)
      //   .subscribe(

      //     data => this._handleSubmitSuccess(data),

      //     err => this._handleSubmitError(err)
      //   );
    }
  }
}
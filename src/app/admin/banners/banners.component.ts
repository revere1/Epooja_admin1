import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from '../../../../node_modules/ngx-dropzone-wrapper';
import { ENV } from '../../env.config';
import { BannersService } from '../../services/banners.service';
import { FormGroup, AbstractControl } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  bannerForm: FormGroup;
  showModel: boolean = false;
  public config: DropzoneConfigInterface;
  uploadFilesObj = {};
  uploadFiles = [];
  canRemove: boolean = true;
  formErrors: any;
  constructor(private _bannerService:BannersService) { }

  ngOnInit() {
    let that = this;
    // this.config = {
    //   url: ENV.BASE_API + 'banners/path?token=' + this._bannerService.getToken(),
    //   maxFiles: ENV.BANNERS_MAX_FILES,
    //   clickable: true,
    //   createImageThumbnails: true,
    //   addRemoveLinks: true,
    //   init: function () {
    //     let drop = this;
    //     this.on('removedfile', function (file) {
    //       if (file.status === 'error') {
    //         let index = (that.uploadFiles).indexOf(that.uploadFilesObj[file.upload.uuid]);
    //         if (index > -1) {
    //           return false;
    //         }
    //       }
    //       /*end*/
    //       if (that.canRemove) {
    //         //Removing values from array which are existing in uploadFiles variable         
    //         let index = (that.uploadFiles).indexOf(that.uploadFilesObj[file.upload.uuid]);
    //         if (index > -1) {
    //           if (that.uploadFiles.length === ENV.LOCKER_MAX_FILES) {
    //             that.formErrors['files'] = '';
    //             that._setErrMsgs(that.bannerForm.get('files'), that.formErrors, 'files');
    //           }
    //           (that.uploadFiles).splice(index, 1);
    //           // that.removeFile(that.uploadFilesObj[file.upload.uuid]);
    //           delete that.uploadFilesObj[file.upload.uuid];
    //         }
    //       }
    //     });
    //     this.on('error', function (file, errorMessage) {

    //       drop.removeFile(file);
    //     });
    //     this.on('success', function (file) {
    //       $('.btn-group').addClass('open');
    //     });
    //   }
    // };
  }

  _setErrMsgs = (control: AbstractControl, errorsObj: any, field: string) => {
    if (control && control.dirty && control.invalid) {
      // const messages = this.sc.validationMessages[field];
      for (const key in control.errors) {
        if (control.errors.hasOwnProperty(key)) {
          // errorsObj[field] += messages[key] + '<br>';
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
    this._setErrMsgs(this.bannerForm.get('files'), this.formErrors, 'files');
  }

  public onUploadError(eve) {
    this.formErrors['files'] = eve[1];
    this._setErrMsgs(this.bannerForm.get('files'), this.formErrors, 'files');
  }
  // private removeFile(file) {
  //   let apiEvent = this._bannerService.removeFile(file).subscribe(
  //     data => {
  //       this._handleSubmitSuccess(data);
  //     },
  //     err => this._handleSubmitError(err)
  //   );
  //   (this.apiEvents).push(apiEvent);
  // }
  modelopen(id)
  {    
    this.showModel = true;
  }

}

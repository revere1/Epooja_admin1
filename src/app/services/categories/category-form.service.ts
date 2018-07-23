import { Injectable } from '@angular/core';

@Injectable()
export class CategoryFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    name: '',
    desc:'',
    status: '',
    createdBy:'',
    updatedBy:'',
 
  };
 

  constructor() {
    this.validationMessages = {
      name: {
        required: `Category Name is <strong>required</strong>.`
      },
      desc: {
        required: `Category Description is <strong>required</strong>.`
      },
      status: {
        required: `Category is <strong>required</strong>.`
      },      
     
    };
  }

}

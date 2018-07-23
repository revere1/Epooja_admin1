

import { Injectable } from '@angular/core';

@Injectable()
export class ProductFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    product_name: '',
    sector: '',
    country:'',
    cost:'',
    quatity:'',
    description:''
  };
 

  constructor() {
    this.validationMessages = {
      product_name: {
        required: `Product_name is <strong>required</strong>.`
      },
      sector: {
        required: `Category is <strong>required</strong>.`
      },      
   
      country:{
        required: `Sub-category is <strong>required</strong>.`
        
      },
      cost:{
        required: `cost is <strong>required</strong>.`,
        pattern:'Only Numbers Allowed'
      },
      quatity:{
        required: `quatity is <strong>required</strong>.`,
        pattern:'Only Numbers Allowed'
      },
      description:{
       required :`product description is <strong>required</strong>`
      }
    };
  }

}

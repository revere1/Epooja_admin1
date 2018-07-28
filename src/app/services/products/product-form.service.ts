

import { Injectable } from '@angular/core';

@Injectable()
export class ProductFormService {

  validationMessages: any;
  // Set up errors object
  formErrors = {
    product_name: '',
    product_code: '',
    category: '',
    subcategory:'',
    cost:'',
    quatity:'',
    description:''
  };
 

  constructor() {
    this.validationMessages = {
      product_name: {
        required: `Product_name is <strong>required</strong>.`
      },
      product_code: {
        required: `Product_code is <strong>required</strong>.`
      },
      category: {
        required: `Category is <strong>required</strong>.`
      },      
   
      subcategory:{
        required: `Sub-category is <strong>required</strong>.`
        
      },
      cost:{
        required: `price is <strong>required</strong>.`,
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
class CategoriesModel {
    constructor(
      public category: string,
      public cat_desc: string,
      public cat_img: string,
      public status:number,
      public created_on: number,
      public updated_on: number,
      public id?: number,
    ) { }
  }
  
  class FormCategoriesModel {
    constructor(
      public category: string,
      public cat_desc: string,
      public cat_img: string,
      public status:number,
      public created_on: number
   
     
    ) { }
  }
  
  export {CategoriesModel, FormCategoriesModel };
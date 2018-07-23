class CategoriesModel {
    constructor(
      public category_name: string,
      public category_desc: string,
      public files = [],
      public status:number,
      public id?: number,
    ) { }
  }
  
  class FormCategoriesModel {
    constructor(
      public category_name: string,
      public category_desc: string,
      public files = [],
      public status:number,
    
   
     
    ) { }
  }
  
  export {CategoriesModel, FormCategoriesModel };
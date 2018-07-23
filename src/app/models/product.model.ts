class ProductModel {
    constructor(
      public product_name: string,
      public category_id : number,
      public subcategory_id: number,       
      public product_description: string,
      public cost: string,
      public quatity: number,
      public files = [],
      public id?: number
      
    ) { }
  }
  
  class FormProductModel {
    constructor(
        public product_name: string,
        public category_id : number,
        public subcategory_id: number,       
        public product_description: string,
        public cost: string,
        public quatity: number,
        public files = [],
    ) { }
  }
  
  export { ProductModel, FormProductModel };
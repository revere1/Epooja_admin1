class ProductModel {
    constructor(
      public product_name: string,
      public product_code: string,
      public category_id : number,
      public subcategory_id: number,       
      public product_description: string,
      //public path,
      public files = [],
      public cost: string,
      public delivery_days:number,
      public quatity: number,
      public status:number,
      public id?: number
      
    ) { }
  }
  
  class FormProductModel {
    constructor(
        public product_name: string,
        public product_code: string,
        public category_id : number,
        public subcategory_id: number,       
        public product_description: string,
        //public path,
        public files = [],
        public cost: string,
        public delivery_days:number,
        public quatity: number,
        public status:number,
    ) { }
  }
  
  export { ProductModel, FormProductModel };
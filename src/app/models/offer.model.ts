class OfferModel {
    constructor(
      public offer_name: string,
      public offer_code: string,
      public offer_description: string,
      public discount_type:string,
      public discount_value :string,
      public limit: string,
      public limit_value: number,
      public status:number,
      public files = [],
      public id?: number
      
    ) { }
  }
  
  class FormOfferModel {
    constructor(
        public offer_name: string,
        public offer_code: string,
        public offer_description: string,
        public discount_type:string, 
        public discount_value :string,     
        public limit: string,
        public limit_value: number,
        public status:number,
        public files = [],
    ) { }
  }
  
  export { OfferModel, FormOfferModel };
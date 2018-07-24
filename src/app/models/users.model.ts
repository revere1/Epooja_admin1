class UsersModel {
    constructor(
      public user_name: string,
      public user_email: string,
      public user_mobile: string,
      public path,
      public status:number,
      public id?: number,
    ) { }
  }
  
  class FormUsersModel {
    constructor(
        public user_name: string,
        public user_email: string,
        public user_mobile: string,
        public path,
        public status:number,
    
   
     
    ) { }
  }
  
  export {UsersModel, FormUsersModel };
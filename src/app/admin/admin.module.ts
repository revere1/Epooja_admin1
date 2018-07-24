import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { AnalystsComponent } from './analysts/analysts.component';
import { ClientsComponent } from './clients/clients.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ScriptService } from '../services/script.service';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { UpdateClientComponent } from './clients/update-client/update-client.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientFormService } from '../services/clients/client-form.service';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductFormService } from '../services/tickers/product-form.service';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { CountriesService } from '../services/countries.service';
import { StatesService } from '../services/states.service';
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { UtilsService } from '../services/utils.service';
import { DataTablesModule } from 'angular-datatables';
import { StatesComponent } from './states/states.component';
import { StatesFormComponent } from './states/states-form/states-form.component';
import { StatesListComponent } from './states/states-list/states-list.component';
import { CreateStatesComponent } from './states/create-states/create-states.component';
import { UpdateStatesComponent } from './states/update-states/update-states.component';
import { CountriesComponent} from './countries/countries.component';
import { CreatecountriesComponent } from './countries/createcountries/createcountries.component';
import { UpdatecountriesComponent } from './countries/updatecountries/updatecountries.component';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { CountriesFormComponent } from './countries/countries-form/countries-form.component';
import { CountriesFormService } from '../services/countries/countries-form.service';
import { StatesFormService } from '../services/states/states-form.service';
import { LockerFormService } from '../services/lockers/locker-form.service';
import { LockersService } from '../services/lockers.service';


import{CategoriesComponent} from './categories/category.component';
import {CreateSectorComponent} from './categories/create-category/create-category.component';
import { UpdateCategoryComponent} from './categories/update-category/update-category.component';
import {SectorsListComponent} from './categories/category-list/categories-list.component';
import{SectorFormComponent} from './categories/category-form/category-form.component';
import { CategoryFormService} from '../services/categories/category-form.service';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
import { SubCategoryComponent } from './sub-categories/sub-category.component';
import { SubCategoryFormComponent } from './sub-categories/sub-category-form/sub-category-form.component';
import { CreateSubCategoryComponent } from './sub-categories/create-sub-category/create-sub-category.component';
import { UpdateSubSectorComponent } from './sub-categories/update-sub-category/update-sub-sector.component';
import { SubCategoryListComponent } from './sub-categories/sub-category-list/sub-category-list.component';
import { SubCategoryFormService} from '../services/sub-categories/sub-category-form.service';
import { AnalystFormComponent } from './analysts/analyst-form/analyst-form.component';
import { AnalystsListComponent } from './analysts/analysts-list/analysts-list.component';
import { CreateAnalystComponent } from './analysts/create-analyst/create-analyst.component';
import { UpdateAnalystComponent } from './analysts/update-analyst/update-analyst.component';
import { ViewAnalystComponent } from './analysts/view-analyst/view-analyst.component';
import { DashboardService } from '../services/dashboard.service';
import { RepeatModule } from '../repeat/repeat.module';
import { HelpFormService } from '../services/help/help-form.service';
import { HelpService } from '../services/help.service';
import { MessagesService } from '../services/messages.service';
import { MessagesFormService } from '../services/messages/messages-form.service';
import { CommodityService } from '../services/insights/commodity.service';
import { ComposeService } from '../services/compose.service';
import { NotificationService } from '../services/notifications.service';
import { 
  MatAutocompleteModule,
  MatInputModule,
  MatSelectModule,
 
} from '@angular/material';
import { RegionsComponent } from './regions/regions.component';
import { CurrencyComponent } from './currency/currency.component';
import { MacroTypeService } from '../services/macrotype.service';
import { PrivillegesComponent } from './clients/privilleges/privilleges.component';
import { CompanyFormService } from '../services/company_details/company-form.service';
import { CompanyService } from '../services/company.service';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    DropzoneModule,
    RepeatModule,
    NgxChartsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule
  ],
  declarations: [
      DashboardComponent, 
      ProductsComponent, 
      AnalystsComponent,
      ClientsComponent,
      AdminLayoutComponent, 
      CreateClientComponent, 
      UpdateClientComponent, 
      ViewClientComponent, 
      ClientsListComponent,
      ClientFormComponent,
      CreateProductComponent, 
      UpdateProductComponent, 
      ViewProductComponent, 
      ProductsListComponent,
      ProductFormComponent,
      StatesComponent,
      StatesFormComponent,
      StatesListComponent,
      CreateStatesComponent,
      UpdateStatesComponent,
      CountriesComponent,
      CountriesListComponent,
      CreatecountriesComponent,
      UpdatecountriesComponent,
      CountriesFormComponent,
      CategoriesComponent,
      SectorsListComponent,
      CreateSectorComponent,
      UpdateCategoryComponent,
      SectorFormComponent,
      SidebarComponent,
      SubCategoryComponent,
      SubCategoryFormComponent,
      CreateSubCategoryComponent,
      UpdateSubSectorComponent,
      SubCategoryListComponent,
      AnalystFormComponent,
      AnalystsListComponent,
      CreateAnalystComponent,
      UpdateAnalystComponent,
      ViewAnalystComponent,
      RegionsComponent,
      CurrencyComponent,
      PrivillegesComponent,
      UsersComponent,
      UsersListComponent,
      UserFormComponent,
      CreateUserComponent,
      UpdateUserComponent,
    
    ],
  providers: [
      ScriptService,
      ClientFormService,
      ProductFormService,
      CompanyFormService,
      UserService,
      ProductService,
      CompanyService,
      CategoriesService,
      SubcategoriesService,
      CountriesService,
      StatesService,
      UtilsService,
      DatePipe,
      CountriesFormService,
      StatesFormService,
      CategoryFormService,
      SubCategoryFormService,
      DashboardService,
      LockerFormService,
      HelpFormService,
      HelpService,
      LockersService,
      LockersService,
      MessagesService,
      MessagesFormService,
      CommodityService,
      ComposeService,
      NotificationService,
      MacroTypeService
      
    ]
    
})
export class AdminModule { }

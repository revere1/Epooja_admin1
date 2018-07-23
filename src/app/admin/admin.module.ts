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
import { SubsectorsService } from '../services/subsectors.service';
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


import{SectorsComponent} from './categories/category.component';
import {CreateSectorComponent} from './categories/create-category/create-category.component';
import { UpdateSectorComponent} from './categories/update-category/update-category.component';
import {SectorsListComponent} from './categories/category-list/categories-list.component';
import{SectorFormComponent} from './categories/category-form/category-form.component';
import { SectorFormService} from '../services/sectors/sector-form.service';
import { SidebarComponent } from './widgets/sidebar/sidebar.component';
//import { HttpModule } from '@angular/http';

import { SubSectorComponent } from './sub-categories/sub-category.component';
import { SubSectorFormComponent } from './sub-categories/sub-category-form/sub-sector-form.component';
import { CreateSubSectorComponent } from './sub-categories/create-sub-category/create-sub-sector.component';
import { UpdateSubSectorComponent } from './sub-categories/update-sub-category/update-sub-sector.component';
import { SubSectorListComponent } from './sub-categories/sub-category-list/sub-category-list.component';
import { SubSectorFormService} from '../services/sub-sectors/sub-sector-form.service';
import { AnalystFormComponent } from './analysts/analyst-form/analyst-form.component';
import { AnalystsListComponent } from './analysts/analysts-list/analysts-list.component';
import { CreateAnalystComponent } from './analysts/create-analyst/create-analyst.component';
import { UpdateAnalystComponent } from './analysts/update-analyst/update-analyst.component';
import { ViewAnalystComponent } from './analysts/view-analyst/view-analyst.component';
import { DashboardService } from '../services/dashboard.service';
import { RepeatModule } from '../repeat/repeat.module';
import { HelpFormService } from '../services/help/help-form.service';
import { HelpService } from '../services/help.service';
//import { HelpCommentFormComponent } from './help/help-comment-form/help-comment-form.component';
//import { HelpListComponent } from './help-comments/help-list/help-list.component';

import { MessagesService } from '../services/messages.service';
import { MessagesFormService } from '../services/messages/messages-form.service';
import { CommodityService } from '../services/insights/commodity.service';
import { ComposeService } from '../services/compose.service';
import { NotificationService } from '../services/notifications.service';

//import { BreadcrumbsModule } from 'ng2-breadcrumbs';
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
import { DropzoneModule } from '../../../node_modules/ngx-dropzone-wrapper';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    DropzoneModule,
    //HttpModule,
    RepeatModule,
    NgxChartsModule,
    //BreadcrumbsModule
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
      SectorsComponent,
      SectorsListComponent,
      CreateSectorComponent,
      UpdateSectorComponent,
      SectorFormComponent,
      SidebarComponent,
      SubSectorComponent,
      SubSectorFormComponent,
      CreateSubSectorComponent,
      UpdateSubSectorComponent,
      SubSectorListComponent,
      AnalystFormComponent,
      AnalystsListComponent,
      CreateAnalystComponent,
      UpdateAnalystComponent,
      ViewAnalystComponent,
      RegionsComponent,
      CurrencyComponent,
      PrivillegesComponent,
      //HelpCommentFormComponent,
    
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
      SubsectorsService,
      CountriesService,
      StatesService,
      UtilsService,
      DatePipe,
      CountriesFormService,
      StatesFormService,
      SectorFormService,
      SubSectorFormService,
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

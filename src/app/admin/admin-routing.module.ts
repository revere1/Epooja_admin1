import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalystsComponent } from './analysts/analysts.component';
import { ClientsComponent } from './clients/clients.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { UpdateClientComponent } from './clients/update-client/update-client.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { TickersComponent } from './products/products.component';
import { TickersListComponent } from './products/products-list/tickers-list.component';
import { CreateTickerComponent } from './products/create-product/create-ticker.component';
import { UpdateTickerComponent } from './products/update-product/update-ticker.component';
import { ViewTickerComponent } from './products/view-product/view-ticker.component';
import { CountriesComponent } from './countries/countries.component';
import { CreatecountriesComponent } from './countries/createcountries/createcountries.component';
import { UpdatecountriesComponent } from './countries/updatecountries/updatecountries.component';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { StatesComponent } from './states/states.component';
import { StatesListComponent } from './states/states-list/states-list.component';
import { CreateStatesComponent } from './states/create-states/create-states.component';
import { UpdateStatesComponent } from './states/update-states/update-states.component';

import { SectorsComponent } from './categories/category.component';
import { CreateSectorComponent } from './categories/create-category/create-category.component';
import { UpdateSectorComponent } from './categories/update-category/update-category.component';
import { SectorsListComponent } from './categories/category-list/categories-list.component';


import { SubSectorComponent } from './sub-categories/sub-category.component';
import { CreateSubSectorComponent } from './sub-categories/create-sub-category/create-sub-sector.component';
import { UpdateSubSectorComponent } from './sub-categories/update-sub-category/update-sub-sector.component';
import { SubSectorListComponent } from './sub-categories/sub-category-list/sub-category-list.component';

import { AnalystFormComponent } from './analysts/analyst-form/analyst-form.component';
import { AnalystsListComponent } from './analysts/analysts-list/analysts-list.component';
import { CreateAnalystComponent } from './analysts/create-analyst/create-analyst.component';
import { UpdateAnalystComponent } from './analysts/update-analyst/update-analyst.component';
import { ViewAnalystComponent } from './analysts/view-analyst/view-analyst.component';
import { RegionsComponent } from './regions/regions.component';
import { CurrencyComponent } from './currency/currency.component';
import { PrivillegesComponent } from './clients/privilleges/privilleges.component';

const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'settings', loadChildren: 'app/admin/settings/settings.module#SettingsModule' },
      { path: 'home', component: DashboardComponent },
      {
        path: 'clients', component: ClientsComponent,
        data: {
          breadcrumb: 'Clients'
        },
        children: [
          { path: '', component: ClientsListComponent },
          {
            path: 'create', component: CreateClientComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateClientComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
          {
            path: 'privilleges/:id', component: PrivillegesComponent,
            data: {
              breadcrumb: 'Privilleges'
            }
          },
          {
            path: 'view/:id', component: ViewClientComponent,
            data: {
              breadcrumb: 'View'
            }
          }
        ]
      },

      {
        path: 'products', component: TickersComponent,
        data: {
          breadcrumb: 'Tickers'
        },
        children: [
          { path: '', component: TickersListComponent },
          {
            path: 'create', component: CreateTickerComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateTickerComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
          {
            path: 'view/:id', component: ViewTickerComponent,
            data: {
              breadcrumb: 'View'
            }
          }
        ]
      },
      {
        path: 'countries', component: ClientsComponent,
        data: {
          breadcrumb: 'Countries'
        },
        children: [
          { path: '', component: CountriesListComponent },
          {
            path: 'create', component: CreatecountriesComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdatecountriesComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
        ]
      },
      {
        path: 'analysts', component: AnalystsComponent,
        data: {
          breadcrumb: 'Analysts'
        },
        children: [
          { path: '', component: AnalystsListComponent },
          {
            path: 'create', component: CreateAnalystComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateAnalystComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
          {
            path: 'view/:id', component: ViewAnalystComponent,
            data: {
              breadcrumb: 'View'
            }
          }
        ]
      },
      {
        path: 'countries', component: ClientsComponent,
        data: {
          breadcrumb: 'Countries'
        },
        children: [
          { path: '', component: CountriesListComponent },
          {
            path: 'create', component: CreatecountriesComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdatecountriesComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
        ]
      },
      {
        path: 'states', component: StatesComponent,
        data: {
          breadcrumb: 'States'
        },
        children: [
          { path: '', component: StatesListComponent },
          {
            path: 'create', component: CreateStatesComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateStatesComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
        ]
      },

      {
        path: 'categories', component: SectorsComponent,
        data: {
          breadcrumb: 'Categories'
        },
        children: [
          { path: '', component: SectorsListComponent },
          {
            path: 'create', component: CreateSectorComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateSectorComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
        ]
      },
      {
        path: 'sub-categories', component: SubSectorComponent,
        data: {
          breadcrumb: 'Sub-Categories'
        },
        children: [
          { path: '', component: SubSectorListComponent },
          {
            path: 'create', component: CreateSubSectorComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateSubSectorComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
        ]
      },
      {
        path:'regions',  component:RegionsComponent ,
      data:{
        breadcrumb:'Regions'
      }
    },
      {path:'currency',component:CurrencyComponent,
      data:{
        breadcrumb:'Currency'
      }
    },
      {
        path: 'management',
        data: {
          breadcrumb: 'Admins'
        }, loadChildren: 'app/admin/management/management.module#ManagementModule'
      },
      {
        path: 'editoriers',
        data: {
          breadcrumb: 'Editoriers'
        }, loadChildren: 'app/admin/editorier/editorier.module#EditorierModule'
      },

      { path: 'lockers', loadChildren: 'app/admin/lockers/lockers.module#LockersModule' },
      { path: 'messages', loadChildren: 'app/admin/admin-messages/admin-messages.module#AdminMessagesModule' },
      { 
        path: 'help', data: {breadcrumb: 'Help'},
        loadChildren: 'app/admin/help-comments/help-comments.module#HelpCommentsModule' 
      },
      { path: 'insights', loadChildren: 'app/admin/admin-insights/admin-insights.module#AdminInsightsModule' },
      // {
      //   path: '', 
      //   children:[
      //    {path:'',loadChildren: 'app/profiles/profiles.module#ProfilesModule'}
      //   ] 
      // } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

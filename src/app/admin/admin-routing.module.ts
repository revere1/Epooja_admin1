import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { UpdateClientComponent } from './clients/update-client/update-client.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ProductsComponent } from './products/products.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { CountriesComponent } from './countries/countries.component';
import { CreatecountriesComponent } from './countries/createcountries/createcountries.component';
import { UpdatecountriesComponent } from './countries/updatecountries/updatecountries.component';
import { CountriesListComponent } from './countries/countries-list/countries-list.component';
import { StatesComponent } from './states/states.component';
import { StatesListComponent } from './states/states-list/states-list.component';
import { CreateStatesComponent } from './states/create-states/create-states.component';
import { UpdateStatesComponent } from './states/update-states/update-states.component';

import { CategoriesComponent } from './categories/category.component';
import { CreateSectorComponent } from './categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';
import { SectorsListComponent } from './categories/category-list/categories-list.component';


import { SubCategoryComponent } from './sub-categories/sub-category.component';
import { CreateSubCategoryComponent } from './sub-categories/create-sub-category/create-sub-category.component';
import { UpdateSubCategoryComponent } from './sub-categories/update-sub-category/update-sub-category.component';
import { SubCategoryListComponent } from './sub-categories/sub-category-list/sub-category-list.component';


import { RegionsComponent } from './regions/regions.component';
import { CurrencyComponent } from './currency/currency.component';
import { PrivillegesComponent } from './clients/privilleges/privilleges.component';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

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
        path: 'products', component: ProductsComponent,
        data: {
          breadcrumb: 'Tickers'
        },
        children: [
          { path: '', component: ProductsListComponent },
          {
            path: 'create', component: CreateProductComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateProductComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
          {
            path: 'view/:id', component: ViewProductComponent,
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
        path: 'categories', component: CategoriesComponent,
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
            path: 'update/:id', component: UpdateCategoryComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
        ]
      },
      {
        path: 'sub-categories', component: SubCategoryComponent,
        data: {
          breadcrumb: 'Sub-Categories'
        },
        children: [
          { path: '', component: SubCategoryListComponent },
          {
            path: 'create', component: CreateSubCategoryComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateSubCategoryComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
        ]
      },


      {
        path: 'users', component: UsersComponent,
        data: {
          breadcrumb: 'Users'
        },
        children: [
          { path: '', component: UsersListComponent },
          {
            path: 'create', component: CreateUserComponent,
            data: {
              breadcrumb: 'Create'
            }
          },
          {
            path: 'update/:id', component: UpdateUserComponent,
            data: {
              breadcrumb: 'Update'
            }
          },
          {
            path: 'view/:id', component: UserDetailsComponent,
            data: {
              breadcrumb: 'Details'
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
      // {
      //   path: 'editoriers',
      //   data: {
      //     breadcrumb: 'Editoriers'
      //   }, loadChildren: 'app/admin/editorier/editorier.module#EditorierModule'
      // },

      { path: 'lockers', loadChildren: 'app/admin/lockers/lockers.module#LockersModule' },
      // { path: 'messages', loadChildren: 'app/admin/admin-messages/admin-messages.module#AdminMessagesModule' },
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

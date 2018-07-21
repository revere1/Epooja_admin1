import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { CreateAdminComponent } from './create-admin/create-admin.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';

const ManagementRoutes: Routes = [

  {
    path: '', component: AdminsListComponent
  },
  {
    path: 'create', component: CreateAdminComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: 'update/:id', component: UpdateAdminComponent,
    data: {
      breadcrumb: 'Update'
    }
  },
  {
    path: 'view/:id', component: ViewAdminComponent,
    data: {
      breadcrumb: 'View'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(ManagementRoutes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }

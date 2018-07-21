import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMessagesFormComponent } from './admin-messages-form/admin-messages-form.component';
// import { AdminMessagesListComponent } from './admin-messages-list/admin-messages-list.component';
import { AdminMessagesFormReplyComponent } from './admin-messages-form-reply/admin-messages-form-reply.component';
import { AdminMessagesFormCreateComponent } from './admin-messages-form-create/admin-messages-form-create.component';

const routes: Routes = [
  {
    path: 'read',
    redirectTo: 'read/',
    pathMatch: 'full'
  },

  // { path: '', component: AdminMessagesListComponent },
  {
    path: 'read/:id', component: AdminMessagesFormComponent,
    data: {
      breadcrumb: 'Read'
    }
  },
  {
    path: 'create', component: AdminMessagesFormCreateComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: 'create/:id', component: AdminMessagesFormCreateComponent,
    data: {
      breadcrumb: 'Create'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMessagesRoutingModule { }

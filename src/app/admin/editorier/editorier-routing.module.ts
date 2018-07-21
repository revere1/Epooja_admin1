import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditoriersListComponent } from './editoriers-list/editoriers-list.component';
import { CreateEditorierComponent } from './create-editorier/create-editorier.component';
import { UpdateEditorierComponent } from './update-editorier/update-editorier.component';
import { ViewEditorierComponent } from './view-editorier/view-editorier.component';

const routes: Routes = [


  {
    path: '', component: EditoriersListComponent
  },
  {
    path: 'create', component: CreateEditorierComponent,
    data: {
      breadcrumb: 'Create'
    }
  },
  {
    path: 'update/:id', component: UpdateEditorierComponent,
    data: {
      breadcrumb: 'Update'
    }
  },
  {
    path: 'view/:id', component: ViewEditorierComponent,
    data: {
      breadcrumb: 'View'
    }
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorierRoutingModule { }

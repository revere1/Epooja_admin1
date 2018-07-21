import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMessagesRoutingModule } from './admin-messages-routing.module';
import { AdminMessagesFormComponent } from './admin-messages-form/admin-messages-form.component';
// import { AdminMessagesListComponent } from './admin-messages-list/admin-messages-list.component';
import { AdminMessagesFormReplyComponent } from './admin-messages-form-reply/admin-messages-form-reply.component';
import { FormGroup, FormBuilder, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepeatModule } from '../../repeat/repeat.module';
//import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DataTablesModule } from 'angular-datatables';
import { AdminMessagesFormCreateComponent } from './admin-messages-form-create/admin-messages-form-create.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

@NgModule({
  imports: [
    CommonModule,
    AdminMessagesRoutingModule,
    FormsModule,
    DataTablesModule,
    ReactiveFormsModule,
    RepeatModule,
    DropzoneModule
    //InfiniteScrollModule
  ],
  declarations: [AdminMessagesFormComponent, AdminMessagesFormReplyComponent, AdminMessagesFormCreateComponent]
})
export class AdminMessagesModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllInsightsComponent } from '../../../admin/admin-insights/all-insights/all-insights.component';
import { AdminPreviewComponent } from './admin-preview/admin-preview.component';



const routes: Routes = [


  { path:'preview/:id',component:AdminPreviewComponent,
  data: {
    breadcrumb: 'Preview'
  },
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminComposeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./components/admin/admin.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ActivityComponent} from "./components/activity/activity.component";

const routes: Routes = [
  {path:'', component:AdminComponent, children:[
      {path:'', redirectTo:'dashboard', pathMatch:'full'},
      {path:'dashboard', component:DashboardComponent},
      {path: 'activities', component: ActivityComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthenticationComponent} from "./components/authentication/authentication.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  {path:'authentication', component: AuthenticationComponent},
  {path:'admin',loadChildren: () => import('./modules/admin/admin.module').then(
      m => m.AdminModule
    )},
  {path:'', redirectTo: 'authentication', pathMatch: 'full'},
  {path:'**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SidebarModule} from "primeng/sidebar";
import {ButtonDirective} from "primeng/button";
import {TableModule} from "primeng/table";
import {ChipsModule} from "primeng/chips";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {MessageModule} from "primeng/message";
import {FileUploadModule} from "primeng/fileupload";
import {SelectButtonModule} from "primeng/selectbutton";
import { ActivityComponent } from './components/activity/activity.component';
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectModule} from "primeng/multiselect";


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    DashboardComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SidebarModule,
    ButtonDirective,
    TableModule,
    ChipsModule,
    DialogModule,
    FormsModule,
    DropdownModule,
    MessageModule,
    FileUploadModule,
    SelectButtonModule,
    CalendarModule,
    InputTextareaModule,
    MultiSelectModule
  ],
  providers: [DatePipe]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Button, ButtonDirective} from "primeng/button";
import { AuthenticationComponent } from './components/authentication/authentication.component';
import {ToastModule} from "primeng/toast";
import {RippleModule} from "primeng/ripple";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageService} from "primeng/api";
import {MessageModule} from "primeng/message";
import {ChipsModule} from "primeng/chips";
import {DropdownModule} from "primeng/dropdown";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {CalendarModule} from "primeng/calendar";

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NotFoundComponent
  ],
  imports: [
    ToastModule,
    RippleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MessageModule,
    ChipsModule,
    ButtonDirective,
    DropdownModule,
    Button,
    CalendarModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {MessageService} from "primeng/api";
import {User} from "../../../../models/User";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  constructor(private router: Router, private authService: AuthService,
              private messageService: MessageService) {
  }

  onLogOut() {
    this.authService.setCurrentUser(new User());
    this.showSuccess('Logged out');
    this.router.navigate(['/authentication']);
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }
}

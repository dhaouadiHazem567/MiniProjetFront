import { Component } from '@angular/core';
import {UserAuthentication} from "../../models/UserAuthentication";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {RoleName} from "../../enums/RoleName";
import {NewPassword} from "../../models/NewPassword";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {

  userAuthentication: UserAuthentication = new UserAuthentication();
  authenticatedUser!: User;

  userEmail: string = '';
  hide: number = 0;
  currentUser!: User;

  userCode!: number;

  newPassword!: string;
  confirmNewPassword!: string;

  constructor(private authService: AuthService, private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.hide = 0;
    this.currentUser = {...this.authService.getCurrentUser()};
  }

  onLogin() {
    this.authService.onLogin(this.userAuthentication).subscribe(
      data => {
        this.authenticatedUser = data;
        this.authService.setCurrentUser(this.authenticatedUser);
        this.showSuccess('Authentication successfully logged in ');
        this.userAuthentication = {
          username: '',
          password: ''
        }
        if (data.roles[0].roleName === RoleName.ROLE_ADMIN)
          this.router.navigate(['/admin']);
        else if (data.roles[0].roleName === RoleName.ROLE_CONTACT)
          this.showSuccess('ROLE_CONTACT');

        console.log(this.authService.getCurrentUser());
      },
      error => {
        console.log(error);
        this.showError("Username or password is incorrect.");
      }
    );
  }

  showSuccess(content: string) {
    this.messageService.add({severity: 'success', summary: 'Success', detail: content});
  }

  showError(content: string) {
    this.messageService.add({severity: 'error', summary: 'Error', detail: content});
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  onForgotPassword() {
    this.authService.onForgotPassword(this.userEmail).subscribe(
      data => {
        this.userEmail = '';
        this.incrementHide();
        this.authService.setCurrentUser(data);
        this.showSuccess('A reset password code has been sent to your email. Please check your inbox and enter the code to proceed.');
        this.currentUser = {...this.authService.getCurrentUser()};
      },
      error => this.showError('Email is incorrect')
    )
  }

  enterCode() {
    if (this.currentUser.code === this.userCode) {
      this.showSuccess('Success');
      this.incrementHide();
    } else
      this.showError('Code is incorrect');
  }

  incrementHide() {
    this.hide++;
  }

  decrementHide(): void {
    this.hide--;
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    if (!password)
      return false;
    return passwordRegex.test(password);
  }

  updatePassword() {
    this.authService.updatePassword(new NewPassword(this.authService.getCurrentUser().id,
      this.newPassword)).subscribe(
      data => {
        this.authService.setCurrentUser(data);
        this.showSuccess('Password reset successfully');
        this.hide = 0;
      },
      error => this.showError('Error occurred while creating new password')
    )
  }
}

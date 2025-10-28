import { Component } from '@angular/core';
import { SignupLoginService } from '../../services/signup-login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  user = { username: '', password: '' };
  message = '';

  constructor(private signupLoginService: SignupLoginService) { }
  onSignup() {
    this.signupLoginService.signup(this.user).subscribe({
      next: res => this.message = 'Signup successful!',
      error: err => this.message = 'Signup failed: ' + err.error?.message
    });
  }

  onLogin() {
    this.signupLoginService.login(this.user).subscribe({
      next: res => this.message = 'Login successful!',
      error: err => this.message = 'Login failed: ' + err.error?.message
    });
  }
}

import { Component, inject } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FloatLabelModule, InputTextModule, FormsModule, Checkbox, ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.minLength(6), Validators.required]}),
    rememberMe: new FormControl(false)
  });

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/chat']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });    
  }
}

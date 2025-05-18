import { Component, inject } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FloatLabelModule, InputTextModule, FormsModule, Checkbox, ReactiveFormsModule]
})
export class LoginComponent {
  private authService = inject(AuthService);

  loginForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.minLength(6), Validators.required]}),
    checkbox: new FormControl(false)
  });

  onSubmit(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({});    
  }
}

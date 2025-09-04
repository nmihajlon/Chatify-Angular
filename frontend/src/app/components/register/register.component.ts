import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

function equalValues(val1: string, val2: string){
  return (control: AbstractControl) => {
    const password = control.get(val1)?.value;
    const confirmPassword = control.get(val2)?.value;
    return password === confirmPassword
      ? null
      : {
          notEqual: true,
        };
  }
}

@Component({
  selector: 'app-register',
  imports: [FloatLabelModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  @Output() registered = new EventEmitter<void>();

  registerForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.email, Validators.required]}),

    passwords: new FormGroup({
      password: new FormControl('', {validators: [Validators.minLength(6), Validators.required]}),
      confirmPassword: new FormControl('', {validators: [Validators.required]}),
    }, {
      validators: [equalValues('password', 'confirmPassword')]
    })
  });

  onSubmit(){
    let newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwords?.password
    }

    this.authService.register(newUser).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
      }
    });

    this.registered.emit();
    this.registerForm.reset();
  }
}

import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

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
    console.log(this.registerForm);
  }
}

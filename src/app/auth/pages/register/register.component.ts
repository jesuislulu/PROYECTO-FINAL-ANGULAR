import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/core/models/Usuario';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  registerForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {    
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.authService.register({       
        ...this.registerForm.value as Usuario,
        token: this.generateToken(),
        rol: 'user'
      });
      this.router.navigate(['/login']);
    }
  }

  generateToken(): string {
    let cadena = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0lulu00789';
  
    for (let i = 0; i < 40; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      cadena += caracteres.charAt(indice);
    }
  
    return cadena;
  }
}

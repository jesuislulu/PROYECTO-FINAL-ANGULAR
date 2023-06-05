import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent {
  firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  rolControl = new FormControl('', [Validators.required]);
  
  registerForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl,
    rol: this.rolControl
  });

  constructor(private matDialogRef: MatDialogRef<CreateUsuarioComponent>){
  }

  save(): void{
    if(this.registerForm.valid){
      this.matDialogRef.close(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}

import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent {
  idControl = new FormControl('');
  tokenControl = new FormControl('');
  firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  rolControl = new FormControl('', [Validators.required]);
  
  registerForm = new FormGroup({
    id: this.idControl,
    token: this.tokenControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl,
    rol: this.rolControl
  });

  constructor(private matDialogRef: MatDialogRef<EditUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.firstNameControl.setValue(this.data.usuario.firstName); 
    this.lastNameControl.setValue(this.data.usuario.lastName);
    this.emailControl.setValue(this.data.usuario.email); 
    this.passwordControl.setValue(this.data.usuario.password);
    this.rolControl.setValue(this.data.usuario.rol);
  }

  save(): void{
    if(this.registerForm.valid){
      this.idControl.setValue(this.data.usuario.id);
      this.tokenControl.setValue(this.data.usuario.token);
      this.matDialogRef.close(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}

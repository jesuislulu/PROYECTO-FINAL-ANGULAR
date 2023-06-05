import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/core/models/Usuario';
import { UsuariosService } from 'src/app/core/services/usuarios.service';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { ViewUsuarioComponent } from './view-usuario/view-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'rol', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Usuario>();

  constructor(private matDialog: MatDialog, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUsuariosList()
      .subscribe((usuarios) => {
        this.dataSource.data = usuarios;
    });
  }

  createUsuario(): void{
    const dialog = this.matDialog.open(CreateUsuarioComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.usuariosService.createUsuario(
          {
            ...value,
            token: this.generateToken()
          }).subscribe((usuarios) => {
            this.dataSource.data = usuarios;
        })    
      }
    });
  }

  view(usuario: Usuario): void{
    this.matDialog.open(ViewUsuarioComponent, {
      data: {
        usuario
      }
    });
  }

  edit(usuario: Usuario): void{
    const dialog = this.matDialog.open(EditUsuarioComponent, {
      data: {
        usuario
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.usuariosService.editUsuario(value).subscribe((usuarios) => {
          this.dataSource.data = usuarios;
        });
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteUsuarioComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.usuariosService.deleteUsuario(id).subscribe((usuarios) => {
          this.dataSource.data = usuarios;
        })
      }
    });
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

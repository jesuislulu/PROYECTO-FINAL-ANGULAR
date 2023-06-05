import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alumno } from 'src/app/core/models/Alumno';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateAlumnosComponent } from './create-alumnos/create-alumnos.component';
import { EditAlumnosComponent } from './edit-alumnos/edit-alumnos.component';
import { DeleteAlumnosComponent } from './delete-alumnos/delete-alumnos.component';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit{
  displayedColumns: string[] = ['id', 'fullName', 'age', 'grade', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Alumno>();
  alumno: Alumno | undefined;
  isAdmin = false;

  constructor(private matDialog: MatDialog, private alumnosService: AlumnosService,
    private inscripcionesService: InscripcionesService, private router: Router,
    private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.alumnosService.getAlumnosList()
      .subscribe((alumnos) => {
        this.dataSource.data = alumnos;
    });

    this.isAdmin = this.authService.isAdmin();
  }

  createAlumno(): void{
    const dialog = this.matDialog.open(CreateAlumnosComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.alumnosService.createAlumno(value).subscribe((alumnos) => {
          this.dataSource.data = alumnos;
        })
      }
    });
  }

  view(id: number): void{
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }

  edit(alumno: Alumno): void{
    const dialog = this.matDialog.open(EditAlumnosComponent, {
      data: {
        alumno
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.alumnosService.editAlumno(value).subscribe((alumnos) => {
          this.dataSource.data = alumnos;
        });
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteAlumnosComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.alumnosService.deleteAlumno(id).subscribe((alumnos) => {
          this.dataSource.data = alumnos;
        });
        this.inscripcionesService.deleteAlumnoInscripcion(id);
      }
    });
  }
}

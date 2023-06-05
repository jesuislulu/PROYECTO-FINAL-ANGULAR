import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/core/models/Curso';
import { CursosService } from 'src/app/core/services/cursos.service';
import { CreateCursoComponent } from './create-curso/create-curso.component';
import { EditCursoComponent } from './edit-curso/edit-curso.component';
import { DeleteCursoComponent } from './delete-curso/delete-curso.component';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'startDate', 'endDate', 'view', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Curso>();
  isAdmin = false;

  constructor(private matDialog: MatDialog, private cursosService: CursosService,
    private inscripcionesService: InscripcionesService, private router: Router,
    private activatedRoute: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.cursosService.getCursosList()
      .subscribe((cursos) => {
        this.dataSource.data = cursos;
    });

    this.isAdmin = this.authService.isAdmin();
  }

  createCurso(): void{
    const dialog = this.matDialog.open(CreateCursoComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.cursosService.createCurso(value).subscribe((cursos) => {
          this.dataSource.data = cursos;
        })
      }
    });
  }

  view(id: number): void{
    this.router.navigate([id], {
      relativeTo: this.activatedRoute,
    });
  }

  edit(curso: Curso): void{
    const dialog = this.matDialog.open(EditCursoComponent, {
      data: {
        curso
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.cursosService.editCurso(value).subscribe((cursos) => {
          this.dataSource.data = cursos;
        });
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteCursoComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.cursosService.deleteCurso(id).subscribe((cursos) => {
          this.dataSource.data = cursos;
        });
        this.inscripcionesService.deleteCursoInscripcion(id);
      }
    });
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateInscripcionComponent } from './create-inscripcion/create-inscripcion.component';
import { EditInscripcionComponent } from './edit-inscripcion/edit-inscripcion.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InscripcionesComponent } from './inscripciones.component';
import { DeleteInscripcionComponent } from './delete-inscripcion/delete-inscripcion.component';
import { ViewInscripcionComponent } from './view-inscripcion/view-inscripcion.component';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionesFeature } from './store/inscripciones.reducer';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    InscripcionesComponent,
    CreateInscripcionComponent,
    EditInscripcionComponent,
    DeleteInscripcionComponent,
    ViewInscripcionComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects]),
    RouterModule.forChild([
      {
        path: '',
        component: InscripcionesComponent
      }
    ])
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }

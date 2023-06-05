import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, tap } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/app/environments/test';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios$ = new BehaviorSubject<Usuario[]>([])

  constructor(private httpClient: HttpClient) {}

  getUsuariosList(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`)
      .pipe(
        tap((usuarios) => this.usuarios$.next(usuarios)),
        mergeMap(() => this.usuarios$.asObservable())
    );
  }

  getUsuarioById(id: number): Observable<Usuario | undefined> {
    return this.usuarios$.asObservable()
      .pipe(
        map((usuario) => usuario.find((a) => a.id === id))
      )
  }

  createUsuario(usuario: Usuario): Observable<Usuario[]>{
    this.httpClient.post<Usuario>(
      `${enviroment.apiBaseUrl}/usuarios`, usuario)
      .subscribe();
    
    return this.getUsuariosList();
  }

  deleteUsuario(id: number): Observable<Usuario[]>{
    this.httpClient.delete<Usuario>(
      `${enviroment.apiBaseUrl}/usuarios/`+ id).subscribe();

    return this.getUsuariosList();
  }

  editUsuario(usuario: Usuario): Observable<Usuario[]>{
    this.httpClient.put<Usuario>(
      `${enviroment.apiBaseUrl}/usuarios/`+ usuario.id, usuario).subscribe();

    return this.getUsuariosList();
  }
}

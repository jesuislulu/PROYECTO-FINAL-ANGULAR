import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';
import { enviroment } from 'src/app/environments/test';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { EstablecerUsuarioAutenticado, QuitarUsuarioAutenticado } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router, private httpClient: HttpClient, private store: Store<AppState>) {}

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {    
    return this.store.select(selectAuthUser);
  }

  establecerUsuarioAutenticado(usuario: Usuario): void {    
    this.store.dispatch(EstablecerUsuarioAutenticado({ payload: usuario }))
    this.authUser$.next(usuario)
  }

  isAdmin(): boolean{
    if(this.authUser$.value?.rol == 'admin'){
      return true
    }
    else{
      return false
    }
  }

  login(formValue: Login): void {
    this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios`,
      {
        params: {
          ...formValue
        },
      }
    ).subscribe({
      next: (usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token)
          this.establecerUsuarioAutenticado(usuarioAutenticado);
          this.router.navigate(['dashboard']);
        } else {
          alert('¡Usuario y contraseña incorrectos!')
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    // this.authUser$.next(null);
    this.store.dispatch(QuitarUsuarioAutenticado());
    this.router.navigate(['auth']);
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            this.establecerUsuarioAutenticado(usuarioAutenticado);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          alert('Error al verificar el token');
          return throwError(() => err);
        })
      );
  }

  register(user: Usuario): void {
    this.httpClient.post<Usuario>(
      `${enviroment.apiBaseUrl}/usuarios`, user)
      .subscribe(response => alert("¡Usuario registrado!"))
  }
}

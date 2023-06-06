import { Usuario } from "src/app/core/models/Usuario";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Login } from "src/app/core/models/Login";

export const USER_MOCK: Usuario = {
  id: 1,
  firstName: 'Lucia',
  lastName: 'Rocha',
  email: 'lucia@mail.com',
  password: 'lulu00',
  token: generateToken(), 
  rol: 'admin'
};

export class AuthServiceMock {

  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  login(formValue: Login): void {
    console.log('Token almacenado:', USER_MOCK.token);
    this.authUser$.next(USER_MOCK);
  }

  verificarToken(): Observable<boolean> {
    const token = USER_MOCK.token;
    console.log('Token recuperado:', token);
    return of(true);
  }

  register(user: Usuario): void {
    console.log('Prueba de usuario registrado');
  }
}

function generateToken(): string {
  let cadena = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 40; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    cadena += caracteres.charAt(indice);
  }

  return cadena;
}

import { Router } from "@angular/router";
import { Login } from "../models/Login";
import { Usuario } from "../models/Usuario";
import { AuthService } from "./auth.service";
import { TestBed } from '@angular/core/testing';
import { enviroment } from "src/app/environments/test";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { skip } from 'rxjs';

describe('Pruebas del AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      }).compileComponents();
  
      service = TestBed.inject(AuthService);
      httpController = TestBed.inject(HttpTestingController);
    });
  
    it('El login debe funcionar.', (done) => {
      const loginTest: Login = {
        email: 'prueba@mail.com',
        password: 'abcdef'
      };

      const MOCK_REQUEST_RESULT: Usuario[] = [
        {
            id: 1,
            firstName: 'Lucia',
            lastName: 'Rocha',
            email: loginTest.email,
            password: loginTest.password,
            token: 'hjsdfJHFDSAFMsaDsan12sdanjjadashj3FDBEWH',
            rol: 'admin'
        }
      ];
  
      spyOn(TestBed.inject(Router), 'navigate');
      service
        .obtenerUsuarioAutenticado()
        .pipe(skip(1))
        .subscribe((usuario) => {
          expect(usuario).toEqual(MOCK_REQUEST_RESULT[0]);
          done();
        });

      service.login(loginTest);

      httpController
        .expectOne({
          url: `${enviroment.apiBaseUrl}/usuarios?email=${loginTest.email}&password=${loginTest.password}`,
          method: 'GET',
        })
        .flush(MOCK_REQUEST_RESULT);
    });
  
    it('El logout debe emitir un authUser null, remover el token del LocalStorage y redireccionar al Login.',
    () => {
      const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
      const loginTest: Login = {
        email: 'prueba@mail.com',
        password: 'abcdef',
      };
      const MOCK_REQUEST_RESULT: Usuario[] = [
        {
            id: 1,
            firstName: 'Lucia',
            lastName: 'Rocha',
            email: loginTest.email,
            password: loginTest.password,
            token: 'hjsdfJHFDSAFMsaDsan12sdanjjadashj3FDBEWH',
            rol: 'admin'
        },
      ];
  
      service.login(loginTest);
      httpController
        .expectOne({
          url: `${enviroment.apiBaseUrl}/usuarios?email=${loginTest.email}&password=${loginTest.password}`,
          method: 'GET',
        })
        .flush(MOCK_REQUEST_RESULT);
  
  
      service.logout(); 
      const tokenLs = localStorage.getItem('token'); 
      expect(tokenLs).toBeNull();
      expect(spyOnNavigate).toHaveBeenCalled();
    });
  });

import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "src/app/core/services/auth.service";
import { AuthServiceMock } from "../../mocks/auth-service.mock";
import { RegisterComponent } from "./register.component";
import { Router } from "@angular/router";

describe('Pruebas del RegisterComponent', () => {
    let component: RegisterComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                RegisterComponent
            ],
            imports: [
                HttpClientModule,
                MatFormFieldModule,
                MatInputModule,
                ReactiveFormsModule,
                RouterTestingModule,
                SharedModule,
                BrowserAnimationsModule
            ],
            providers: [
              {
                provide: AuthService,
                useClass: AuthServiceMock,
              }
            ]
        }).compileComponents();

        const fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Si el campo nombre está vacío, el FormControl del firstName debe ser inválido.', () => {
        component.registerForm.setValue({ 
            firstName: null, 
            lastName: null,
            email: null,
            password: null
        })
        expect(component.firstNameControl.invalid).toBeTrue();
    });

    it('Si el campo apellido está vacío, el FormControl del lastName debe ser inválido.', () => {
        component.registerForm.setValue({ 
            firstName: null, 
            lastName: null,
            email: null,
            password: null
        })
        expect(component.lastNameControl.invalid).toBeTrue();
    });

    it('Si el campo email está vacío, el FormControl del email debe ser inválido.', () => {
        component.registerForm.setValue({ 
            firstName: null, 
            lastName: null,
            email: null,
            password: null
        })
        expect(component.emailControl.invalid).toBeTrue();
    });

    it('Si el campo contraseña está vacío, el FormControl del password debe ser inválido.', () => {
        component.registerForm.setValue({ 
            firstName: null, 
            lastName: null,
            email: null,
            password: null
        })
        expect(component.passwordControl.invalid).toBeTrue();
    });

    it('Si el registerForm es inválido, debe marcar todos los controles como touched.', () => {
        component.registerForm.setValue({ 
            firstName: null, 
            lastName: null,
            email: null,
            password: null
        })
        const spyOnMarkAllAsTouched = spyOn(component.registerForm, 'markAllAsTouched');
        component.onSubmit();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });

    it('Si el registerForm es válido, debe llamar al método register del AuthService y redirigir al Login.', () => {
        component.registerForm.setValue({ 
            firstName: 'Prueba', 
            lastName: 'Lucia',
            email: 'prueba@mail.com',
            password: 'abcdef'
        });

        const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
        const spyOnAuthServiceRegister = spyOn(TestBed.inject(AuthService), 'register');
        component.onSubmit();
        expect(component.registerForm.valid).toBeTrue();
        expect(spyOnNavigate).toHaveBeenCalled();
        expect(spyOnAuthServiceRegister).toHaveBeenCalled();
    });
});
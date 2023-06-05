import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "src/app/core/services/auth.service";
import { AuthServiceMock } from "../../mocks/auth-service.mock";

describe('Pruebas del LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent
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

        const fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Si el campo email está vacío, el FormControl del email debe ser inválido.', () => {
        component.loginForm.setValue({ email: null, password: null })
        expect(component.emailControl.invalid).toBeTrue();
    });

    it('Si el campo contraseña está vacío, el FormControl del password debe ser inválido.', () => {
        component.loginForm.setValue({ email: null, password: null })
        expect(component.passwordControl.invalid).toBeTrue();
    });

    it('Si el loginForm es inválido, debe marcar todos los controles como touched.', () => {
        component.loginForm.setValue({ email: null, password: null })
        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
        component.onSubmit();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });

    it('Si el loginForm es válido, debe llamar al método login del AuthService.', () => {
        component.loginForm.setValue({ email: 'prueba@mail.com', password: 'abcdef' });
        const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'login');
        component.onSubmit();
        expect(component.loginForm.valid).toBeTrue();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    });
});
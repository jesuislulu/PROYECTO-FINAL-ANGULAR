import { Component, OnDestroy } from '@angular/core';
import Links from '../core/models/Links';
import { Observable, Subject, map } from 'rxjs';
import { Usuario } from '../core/models/Usuario';
import { enviroment } from '../environments/test';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { AdminGuard } from '../auth/guards/admin.guard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  routerLinks = Links;
  showFiller = false;
  isProd = enviroment.isProduction;
  authUser$: Observable<Usuario | null>;
  destroyed$ = new Subject<void>();
  componentName: string | undefined = '';
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();  
    this.isAdmin = this.authService.isAdmin();
    this.routerLinks.forEach(router => {
      if(router.path == 'usuarios' && !this.isAdmin){
        this.routerLinks = this.routerLinks.filter(x => x.path != 'usuarios')
      }
    });  
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        const comptName = url.substring(url.lastIndexOf('/') + 1);
        this.componentName = comptName.charAt(0).toUpperCase() + comptName.slice(1);
      }
    });    
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
  }
}

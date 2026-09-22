import { Component, signal, inject, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../features/user/services/auth.service';
import { InitialsPipe } from '../../core/pipes/initials.pipe';
import { SidebarMenuService } from '../services/sibear-menu.service';
import { AuthCookieService } from '../../features/user/services/auth-cookie.service';

@Component({
  selector: 'app-topbar',
  imports: [InitialsPipe],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  private router = inject(Router);
  private readonly authCookieService = inject(AuthCookieService);
  private readonly sidebarState = inject(SidebarMenuService);

  toggleMenu() {
    this.sidebarState.toggleMobileMenu();
  }

  email = this.authCookieService.getEmail();

  isUserMenuOpen = signal<boolean>(false);
  breadcrumbs = signal<string[]>(['Soporte', 'Tablero']);

  // Diccionario para mapear tus rutas a los textos del breadcrumb
  private routeNames: Record<string, string> = {
    '/ticket-board-page': 'Tablero',
    '/ticket-form': 'Nuevo ticket',
    '/all-ticket-page': 'Todos los tickets',
    '/my-ticket-page': 'Mis tickets',
    '/knowledge-base': 'Base de conocimiento',
    '/settings': 'Configuración'
  };

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe((event: NavigationEnd) => {

      const currentUrl = event.urlAfterRedirects.split('?')[0];
      const pageName = this.routeNames[currentUrl] || 'Tablero';
      this.breadcrumbs.set(['Soporte', pageName]);
    });
  }

  toggleUserMenu() {
    this.isUserMenuOpen.update(open => !open);
  }

  logout() {
    this.authCookieService.logout();
    this.router.navigate(['/login']);
  }

  closeMenu(): void {
    this.isUserMenuOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {

    const target = event.target as HTMLElement;

    if (!target.closest('.avatar-container')) {
      this.closeMenu();
    }
  }
}

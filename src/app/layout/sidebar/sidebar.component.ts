import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { InitialsPipe } from '../../core/pipes/initials.pipe';
import { SidebarMenuService } from '../services/sibear-menu.service';
import { AuthCookieService } from '../../features/user/services/auth-cookie.service';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, InitialsPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private readonly authCookieService = inject(AuthCookieService);
  private readonly sidebarState = inject(SidebarMenuService);
  private router = inject(Router);
  isUserMenuOpen = signal<boolean>(false);

  isMobileMenuOpen = this.sidebarState.isMobileMenuOpen;

  user = signal({
    name: this.authCookieService.getEmail(),
    role: this.authCookieService.userRole(),
    avatarInitials: this.authCookieService.getEmail(),
  });

  // Agrupación de menús basada en el diseño
  gestionMenu = signal<MenuItem[]>([
    { id: 'tablero', label: 'Tablero', icon: 'view_kanban', route: 'ticket-board-page' },
    { id: 'todos', label: 'Todos los tickets', icon: 'inbox', route: '/all-ticket-page' },
    { id: 'mis-tickets', label: 'Mis tickets', icon: 'person', route: '/my-ticket-page' }
  ]);

  recursosMenu = signal<MenuItem[]>([
    { id: 'base', label: 'Base de conocimiento', icon: 'menu_book', route: '/knowledge-base' },
    { id: 'config', label: 'Configuración', icon: 'settings', route: '/settings' }
  ]);

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

    if (!target.closest('.user-profile')) {
      this.closeMenu();
    }
  }

  closeMobileMenu() {
    this.sidebarState.closeMobileMenu();
  }
}

import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../features/user/services/auth.service';
import { InitialsPipe } from '../../core/pipes/initials.pipe';

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
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  isUserMenuOpen = signal<boolean>(false);

  user = signal({
    name: this.authService.getEmail(),
    role: this.authService.getRole(),
    avatarInitials: this.authService.getEmail(),
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
    this.authService.logout();
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
}

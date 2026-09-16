import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // Estado del usuario manejado con Signals
  user = signal({
    name: 'Ana Torres',
    role: 'Administradora',
    avatarInitials: 'AT'
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
}

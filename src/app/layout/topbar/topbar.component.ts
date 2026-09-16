import { Component, signal, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  private router = inject(Router);
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
    // Escuchamos cada vez que la navegación termina exitosamente
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntilDestroyed() // Auto-limpia la suscripción si el componente se destruye
    ).subscribe((event: NavigationEnd) => {

      // Obtenemos la URL actual limpia (sin parámetros extra)
      const currentUrl = event.urlAfterRedirects.split('?')[0];

      // Buscamos el nombre en el diccionario, si no existe ponemos 'Tablero' por defecto
      const pageName = this.routeNames[currentUrl] || 'Tablero';

      // Actualizamos la signal, lo que refrescará la vista automáticamente
      this.breadcrumbs.set(['Soporte', pageName]);
    });
  }
}

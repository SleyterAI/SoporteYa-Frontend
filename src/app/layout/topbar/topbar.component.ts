import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  // Angular 21: Usamos la nueva API 'input()' (Signal-based inputs)
  // en lugar del decorador @Input() tradicional
  breadcrumbs = input<string[]>(['Soporte', 'Tablero']);
}

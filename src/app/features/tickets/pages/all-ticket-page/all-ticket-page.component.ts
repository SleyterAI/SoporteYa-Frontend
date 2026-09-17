import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketService } from '../../services/ticket.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-all-ticket-page',
  imports: [NgClass, RouterLink, TimeAgoPipe],
  templateUrl: './all-ticket-page.component.html',
  styleUrl: './all-ticket-page.component.css',
})
export class AllTicketPageComponent {
  private readonly ticketService = inject(TicketService);
  private readonly categoriaService = inject(CategoriaService);

  selectedEstado = signal<string>('');
  selectedPrioridad = signal<string>('');

  readonly ticketResource = rxResource({
    stream: () => {
      const estado = this.selectedEstado() || undefined;
      const prioridad = this.selectedPrioridad() || undefined;

      return this.ticketService.getTickets(estado, prioridad);
    }
  });

  readonly categoriaResource = rxResource({
    stream: () => this.categoriaService.getAllCategoria()
  });

  onEstadoChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedEstado.set(value);
    this.ticketResource.reload();
  }

  onPrioridadChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedPrioridad.set(value);
    this.ticketResource.reload();
  }

  getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
}

import { Component, computed, inject, signal } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketRowComponent } from '../../components/ticket-row/ticket-row.component';
import { TicketCardComponent } from '../../components/ticket-card/ticket-card.component';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket-board-page',
  imports: [JsonPipe, TicketRowComponent, TicketCardComponent, RouterLink],
  templateUrl: './ticket-board-page.component.html',
  styleUrl: './ticket-board-page.component.css',
})
export class TicketBoardPageComponent {
  private readonly ticketService = inject(TicketService);
  cadena = signal("prueba");

  readonly ticketResource = rxResource({
    stream: () => this.ticketService.getTickets()
  });

  ticketsAbiertos = computed(() => {
    const list = this.ticketResource.value() || [];
    return list.filter(t => (t.estado || 'ABIERTO') === 'ABIERTO');
  });

  ticketsEnProgreso = computed(() => {
    const list = this.ticketResource.value() || [];
    return list.filter(t => t.estado === 'EN_PROGRESO');
  });

  ticketsResueltos = computed(() => {
    const list = this.ticketResource.value() || [];
    return list.filter(t => t.estado === 'RESUELTO');
  });

  ticketsCerrados = computed(() => {
    const list = this.ticketResource.value() || [];
    return list.filter(t => t.estado === 'CERRADO');
  });
}

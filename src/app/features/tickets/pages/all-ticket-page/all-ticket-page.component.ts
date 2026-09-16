import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketService } from '../../services/ticket.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-all-ticket-page',
  imports: [NgClass, RouterLink, TimeAgoPipe],
  templateUrl: './all-ticket-page.component.html',
  styleUrl: './all-ticket-page.component.css',
})
export class AllTicketPageComponent {
  private readonly ticketService = inject(TicketService);

  readonly ticketResource = rxResource({
    stream: () => this.ticketService.getTickets()
  });

  // Helper para crear el círculo con las iniciales del usuario
  getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
}

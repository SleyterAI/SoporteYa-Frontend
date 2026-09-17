import { Component, inject } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-ticket-page',
  imports: [NgClass, TimeAgoPipe, RouterLink],
  templateUrl: './my-ticket-page.component.html',
  styleUrl: './my-ticket-page.component.css',
})
export class MyTicketPageComponent {
  private readonly ticketService = inject(TicketService);

  readonly ticketResource = rxResource({
    stream: () => this.ticketService.getTicketByUserEmail()
  });

  getInitials(name: string): string {
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
}

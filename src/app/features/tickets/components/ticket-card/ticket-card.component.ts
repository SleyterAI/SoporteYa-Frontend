import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { TicketResponse } from '../../models/ticket.interface';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ticket-card',
  imports: [NgClass, TimeAgoPipe, RouterLink],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css',
})
export class TicketCardComponent {
  ticket = input.required<TicketResponse>();

  getInitials(): string {
    const name = this.ticket().user_fullname;
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }
}

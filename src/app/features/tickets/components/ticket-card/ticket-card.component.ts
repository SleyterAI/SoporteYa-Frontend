import { NgClass } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { TicketResponse } from '../../models/ticket.interface';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';
import { Router } from '@angular/router';
import { AuthService } from '../../../user/services/auth.service';

@Component({
  selector: 'app-ticket-card',
  imports: [NgClass, TimeAgoPipe],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css',
})
export class TicketCardComponent {
  ticket = input.required<TicketResponse>();
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  getInitials(): string {
    const name = this.ticket().user_fullname;
    if (!name) return 'U';
    const parts = name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }

  onCardClick() {
    const role = this.authService.getRole();

    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/ticket', this.ticket().id]);
    } else {
      console.warn('Not access');
    }
  }
}

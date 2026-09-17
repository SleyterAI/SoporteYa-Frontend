import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketService } from '../../services/ticket.service';
import { DatePipe, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../../../core/pipes/time-ago.pipe';
import { UpdateTicketRequest } from '../../models/ticket.interface';
import { ToastComponent } from '../../../../components/toast/toast.component';

@Component({
  selector: 'app-all-ticket-page',
  imports: [NgClass, RouterLink, TimeAgoPipe, DatePipe, ToastComponent],
  templateUrl: './ticket-detail-page.component.html',
  styleUrl: './ticket-detail-page.component.css',
})
export class TicketDetailPageComponent {
  private readonly ticketService = inject(TicketService);
  showToast = signal(false);

  id = input.required<string>();

  readonly ticketResource = rxResource({
    stream: () => {
      const currentId = Number(this.id());
      return this.ticketService.getTicketById(currentId);
    }
  });

  getInitials(name?: string): string {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }

  cambiarEstado(nuevoEstado: string) {
    const payload: UpdateTicketRequest = {
      estado: nuevoEstado
    };

    this.ticketService.updateTicketEstado(Number(this.id()), payload).subscribe({
      next: () => {
        //Magic ng21 reload
        this.ticketResource.reload();

        this.showToast.set(true);
        setTimeout(() => {
          this.showToast.set(false);
        }, 1500);

      },
      error: (err) => {
        console.error('Ocurrió un error al intentar cambiar el estado:', err);
      }
    });
  }

}

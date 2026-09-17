import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { UserService } from '../../../user/services/user.service';
import { TicketRequest } from '../../models/ticket.interface';
import { ToastComponent } from '../../../../components/toast/toast.component';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private readonly categoriaService = inject(CategoriaService);
  private readonly userService = inject(UserService);
  private readonly ticketService = inject(TicketService);

  showToast = signal(false);

  prioridades = ['BAJA', 'MEDIA', 'ALTA'];

  readonly userResource = rxResource({
    stream: () => this.userService.getAllUsuario()
  });

  readonly categoriaResource = rxResource({
    stream: () => this.categoriaService.getAllCategoria()
  });

  // Definición del formulario reactivo
  ticketForm = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    prioridad: ['Baja', Validators.required],
    categoria_id: [0, [Validators.required, Validators.min(1)]],
    user_id: [0, [Validators.required, Validators.min(1)]],
    descripcion: ['', Validators.required],
  });

  createTicket() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }
    const formValues = this.ticketForm.getRawValue();

    // Construimos el request cumpliendo al 100% con las interfaces
    const request: TicketRequest = {
      titulo: formValues.titulo,
      descripcion: formValues.descripcion,
      prioridad: formValues.prioridad,
      categoria: { id: formValues.categoria_id },
      user: { id: formValues.user_id }
    };

    this.ticketService.createTicket(request).subscribe({
      next: () => {
        this.showToast.set(true);

        setTimeout(() => {
          this.showToast.set(false);
          this.router.navigate(['ticket-board-page']);
        }, 1500);
      },
      error: (error) => {
        console.error('Error ticket: ', error);
      }
    });
  }

  onCancel() {
    this.router.navigate(['ticket-board-page']);
  }
}

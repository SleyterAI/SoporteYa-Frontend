import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent {
  private fb = inject(FormBuilder);

  // Definición del formulario reactivo
  ticketForm = this.fb.nonNullable.group({
    asunto: ['', [Validators.required, Validators.minLength(5)]],
    categoria: ['Ventas', Validators.required],
    prioridad: ['Media', Validators.required],
    descripcion: ['', Validators.required]
  });

  // Opciones para los selectores
  categorias = ['Acceso', 'Ventas', 'Soporte Técnico', 'Facturación', 'Operaciones'];
  prioridades = ['Baja', 'Media', 'Alta'];

  onSubmit() {
    if (this.ticketForm.valid) {
      console.log('Ticket a guardar:', this.ticketForm.getRawValue());
      // Aquí llamarías a tu servicio: this.ticketService.create(this.ticketForm.getRawValue())
      this.ticketForm.reset({ categoria: 'Ventas', prioridad: 'Media' });
    } else {
      this.ticketForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.ticketForm.reset({ categoria: 'Ventas', prioridad: 'Media' });
    // Aquí puedes agregar lógica para cerrar un modal o volver atrás en la ruta
  }
}

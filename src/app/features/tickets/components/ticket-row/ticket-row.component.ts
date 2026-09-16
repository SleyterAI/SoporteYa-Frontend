import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ticket-row',
  imports: [],
  templateUrl: './ticket-row.component.html',
  styleUrl: './ticket-row.component.css',
})
export class TicketRowComponent {
  title = input.required<string>();
  value = input.required<string>();
  icon = input.required<string>();
}

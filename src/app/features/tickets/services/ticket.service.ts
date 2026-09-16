import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ticket, TicketRequest, TicketResponse } from '../models/ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/tickets`;

  createTicket(ticketResponse: TicketResponse): Observable<TicketRequest> {
    return this.http.post<TicketRequest>(this.apiUrl, ticketResponse);
  }

  getTickets(estado?: string, prioridad?: string): Observable<TicketResponse[]> {
    let params = new HttpParams();
    if (estado) params = params.set('estado', estado);
    if (prioridad) params = params.set('prioridad', prioridad);

    return this.http.get<TicketResponse[]>(this.apiUrl,{ params });
  }

  getTicketById(id: number): Observable<TicketResponse> {
    return this.http.get<TicketResponse>(`${this.apiUrl}/${id}`);
  }

  updateTicketEstado(id: number, newStatus: Ticket): Observable<string> {
    return this.http.patch(`${this.apiUrl}/${id}/estado`, { newStatus },
      { responseType: 'text' });
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

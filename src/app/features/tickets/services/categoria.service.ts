import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Ticket, TicketRequest, TicketResponse } from '../models/ticket.interface';
import { CategoriaResponse } from '../models/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/categorias`;

  getAllCategoria(): Observable<CategoriaResponse[]> {
    return this.http.get<CategoriaResponse[]>(this.apiUrl);
  }
}

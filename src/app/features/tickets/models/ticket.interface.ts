export interface Ticket{
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: string;  //ALTA-MEDIA-BAJA
  estado: string; //ABIERTO-EN_PROGRESO-RESUELTO-CERRADO
  fechaCreacion: string;
}

export interface TicketRequest{
  titulo: string;
  descripcion: string;
  prioridad: string;
}

export interface TicketResponse{
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: string;  //ALTA-MEDIA-BAJA
  estado: string; //ABIERTO-EN_PROGRESO-RESUELTO-CERRADO
  fechaCreacion: string;
}


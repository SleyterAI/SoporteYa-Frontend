export interface Categoria{
  id: number;
}

export interface User{
  id: number;
}

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
  categoria: Categoria;
  user: User;
}

export interface TicketResponse{
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: string;  //ALTA-MEDIA-BAJA
  estado: string; //ABIERTO-EN_PROGRESO-RESUELTO-CERRADO
  categoria_name: string;
  fechaCreacion: string;
  user_fullname: string;
}

export interface UpdateTicketRequest{
  estado: string;
}


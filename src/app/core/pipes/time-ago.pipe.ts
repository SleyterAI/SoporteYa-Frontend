import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true // Pipe moderno sin necesidad de módulos
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return 'Fecha desconocida';

    const date = new Date(value);
    const now = new Date();

    // Diferencia en milisegundos
    const diffMs = now.getTime() - date.getTime();

    // Si la fecha es en el futuro (por desajustes de reloj local), mostramos recién
    if (diffMs < 0) return 'Hace un momento';

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Lógica requerida
    if (diffMinutes < 60) {
      return diffMinutes <= 1 ? 'Hace 1 minuto' : `Hace ${diffMinutes} minutos`;
    }

    if (diffHours < 24) {
      return diffHours === 1 ? 'Hace 1 hora' : `Hace ${diffHours} horas`;
    }

    if (diffHours >= 24 && diffHours < 48) {
      return 'Ayer';
    }

    // Si pasaron 48 horas o más
    return `${diffDays} días`;
  }
}

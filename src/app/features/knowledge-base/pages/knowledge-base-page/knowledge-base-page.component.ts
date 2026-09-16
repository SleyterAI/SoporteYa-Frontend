import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Article {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  readTime: string;
  url: string; // URL externa a donde apuntará el link
}

@Component({
  selector: 'app-knowledge-base-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './knowledge-base-page.component.html',
  styleUrl: './knowledge-base-page.component.css'
})
export class KnowledgeBasePageComponent {
  // Datos simulados basados en el PDF
  articles: Article[] = [
    {
      id: '1',
      category: 'ACCESOS Y CUENTAS',
      title: 'Cómo restablecer el acceso al portal',
      description: 'Procedimiento recomendado para resolver esta solicitud paso a paso y de manera segura para el cliente.',
      icon: 'lock_reset',
      readTime: '3 min read',
      url: 'https://tu-wiki-externa.com/guia/restablecer-acceso' // Cambia por tu link real
    },
    {
      id: '2',
      category: 'SISTEMAS',
      title: 'Guía de permisos para equipos',
      description: 'Procedimiento recomendado para resolver esta solicitud paso a paso garantizando las políticas de la empresa.',
      icon: 'admin_panel_settings',
      readTime: '5 min read',
      url: 'https://tu-wiki-externa.com/guia/permisos'
    },
    {
      id: '3',
      category: 'REPORTES',
      title: 'Solución de errores en reportes',
      description: 'Procedimiento recomendado para tener mayor visibilidad de los errores comunes al exportar data.',
      icon: 'bug_report',
      readTime: '4 min read',
      url: 'https://tu-wiki-externa.com/guia/errores-reportes'
    },
    {
      id: '4',
      category: 'INTEGRACIONES',
      title: 'Conectar una integración CRM',
      description: 'Procedimiento recomendado para configurar los webhooks y las llaves de API necesarias para sincronizar.',
      icon: 'sync_alt',
      readTime: '7 min read',
      url: 'https://tu-wiki-externa.com/guia/integracion-crm'
    }
  ];
}

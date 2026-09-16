import { Routes } from '@angular/router';
import { FullPageComponent } from './layout/full-page/full-page.component';
import { TicketBoardPageComponent } from './features/tickets/pages/ticket-board-page/ticket-board-page.component';
import { AllTicketPageComponent } from './features/tickets/pages/all-ticket-page/all-ticket-page.component';
import { MyTicketPageComponent } from './features/tickets/pages/my-ticket-page/my-ticket-page.component';
import { KnowledgeBasePageComponent } from './features/knowledge-base/pages/knowledge-base-page/knowledge-base-page.component';
import { SettingsPageComponent } from './features/settings/pages/settings-page/settings-page.component';
import { TicketFormComponent } from './features/tickets/components/ticket-form/ticket-form.component';

export const routes: Routes = [
  {
    path: '',
    component: FullPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'ticket-board-page', // Ruta por defecto cuando entras a la app
        pathMatch: 'full'
      },
      {
        path: 'ticket-board-page',
        component: TicketBoardPageComponent,
      },
      {
        path: 'ticket-form',
        component: TicketFormComponent,
      },
      {
        path: 'all-ticket-page',
        component: AllTicketPageComponent,
      },
      {
        path: 'my-ticket-page',
        component: MyTicketPageComponent,
      },
      {
        path: 'knowledge-base',
        component: KnowledgeBasePageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
    ]
  },
];

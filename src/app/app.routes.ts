import { Routes } from '@angular/router';
import { FullPageComponent } from './layout/full-page/full-page.component';
import { TicketBoardPageComponent } from './features/tickets/pages/ticket-board-page/ticket-board-page.component';
import { AllTicketPageComponent } from './features/tickets/pages/all-ticket-page/all-ticket-page.component';
import { MyTicketPageComponent } from './features/tickets/pages/my-ticket-page/my-ticket-page.component';
import { KnowledgeBasePageComponent } from './features/knowledge-base/pages/knowledge-base-page/knowledge-base-page.component';
import { SettingsPageComponent } from './features/settings/pages/settings-page/settings-page.component';
import { TicketFormComponent } from './features/tickets/components/ticket-form/ticket-form.component';
import { LoginPageComponent } from './features/user/pages/login-page/login-page.component';
import { authGuard } from './core/guards/auth.guard';
import { TicketDetailPageComponent } from './features/tickets/pages/ticket-detail-page/ticket-detail-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: FullPageComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'ticket-board-page',
        pathMatch: 'full'
      },
      {
        path: 'ticket-board-page',
        component: TicketBoardPageComponent,
      },
      {
        path: 'ticket/:id',
        component: TicketDetailPageComponent,
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

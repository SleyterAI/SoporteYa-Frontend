import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { TicketBoardPageComponent } from '../../features/tickets/pages/ticket-board-page/ticket-board-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-full-page',
  imports: [SidebarComponent, TopbarComponent, RouterOutlet],
  templateUrl: './full-page.component.html',
  styleUrl: './full-page.component.css',
})
export class FullPageComponent {

}

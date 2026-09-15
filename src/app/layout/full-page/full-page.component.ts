import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-full-page',
  imports: [SidebarComponent, TopbarComponent, MainComponent],
  templateUrl: './full-page.component.html',
  styleUrl: './full-page.component.css',
})
export class FullPageComponent {

}

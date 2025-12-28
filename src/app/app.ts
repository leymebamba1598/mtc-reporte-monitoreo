import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideMenuComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('MTC-FRONT-MONITOREO-REPORTES');
}

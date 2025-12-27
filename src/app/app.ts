import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReporteTabla } from './report/reporte-tabla/reporte-tabla';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReporteTabla],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('MTC-FRONT-MONITOREO-REPORTES');
}

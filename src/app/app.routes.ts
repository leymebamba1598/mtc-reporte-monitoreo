import { Routes } from '@angular/router';
import { ReporteTabla } from './report/reporte-tabla/reporte-tabla';

export const routes: Routes = [
    { path: '', redirectTo: 'reporte-tabla', pathMatch: 'full' },
    { path: 'reporte-tabla', component: ReporteTabla }
];

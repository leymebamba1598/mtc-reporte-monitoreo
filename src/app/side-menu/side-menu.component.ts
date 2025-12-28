import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface MenuItem {
    label: string;
    icon: string;
    route?: string;
    children?: MenuItem[];
    expanded?: boolean;
}

@Component({
    selector: 'app-side-menu',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule],
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
    menuItems: MenuItem[] = [
        // {
        //   label: 'Resumen General de Predios',
        //   icon: 'pi pi-gauge',
        //   route: '/resumen-predios'
        // },
        {
            label: 'Principales reportes',
            icon: 'pi pi-stop-circle',
            expanded: true,
            children: [
                { label: 'Programación Predios Física y Financiera 2026', icon: '', route: '/reporte-tabla' }, // Linking to existing route
                { label: 'Otros reportes', icon: '', route: '/graficos-interferencias' },
                // { label: 'Gráficos de Metas Financieras de Interferencias', icon: '', route: '/graficos-metas' },

                // { label: 'Convenios de Interferencias', icon: '', route: '/convenios' },
                // { label: 'Listado de Estados de Interferencias', icon: '', route: '/listado-estados' },
                // { label: 'Búsqueda de Profesionales', icon: '', route: '/busqueda-profesionales' }
            ]
        },
        // {
        //   label: 'Ejecución Presupuestal',
        //   icon: 'pi pi-chart-line',
        //   route: '/ejecucion-presupuestal'
        // },
        // {
        //   label: 'Tenencia de Terceros',
        //   icon: 'pi pi-desktop',
        //   route: '/tenencia-terceros'
        // }
    ];

    toggleMenu(item: MenuItem) {
        if (item.children) {
            item.expanded = !item.expanded;
        }
    }
}

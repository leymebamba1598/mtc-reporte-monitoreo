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
          {
            label: 'Principales reportes',
            icon: 'pi pi-stop-circle',
            expanded: true,
            children: [
                { label: 'Reporte programación Predios', icon: '', route: '/reporte-tabla' }, // Linking to existing route
                { label: 'Otros reportes', icon: '', route: '/graficos-interferencias' },
                { label: 'Gráficos', icon: '', route: '/graficos-metas' },

            ]
        },
        {
          label: 'Reportes graficos',
          icon: 'pi pi-gauge',
          route: '/resumen-predios'
        },
        {
          label: 'Otros Reportes',
          icon: 'pi pi-chart-line',
          route: '/ejecucion-presupuestal'
        },
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

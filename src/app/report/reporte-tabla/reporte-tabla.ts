import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { IReportItem } from './types/types';

@Component({
  selector: 'app-reporte-tabla',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ToastModule, RatingModule, TagModule, RippleModule, FormsModule],
  templateUrl: './reporte-tabla.html',
  styleUrls: ['./reporte-tabla.css'],
  providers: [MessageService],
})
export class ReporteTabla implements OnInit {
  products: IReportItem[] = [];
  expandedRows: { [key: string]: boolean } = {};

  constructor(private messageService: MessageService, private http: HttpClient, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPrediosReport();
  }

    loadPrediosReportTable() {
    this.products = [
      {
        id: 1000,
        name: 'CG VIAL 1',
        enero: { cantidad: 0, valor: 0 },
        febrero: { cantidad: 7, valor: 459626.36 },
        marzo: { cantidad: 5, valor: 336814.52 },
        orders: [
          {
            id: 'ADS',
            enero: { cantidad: 0, valor: 0 },
            febrero: { cantidad: 4, valor: 455049.18 },
            marzo: { cantidad: 4, valor: 335813.76 },
          },
          {
            id: 'RED VIAL 05',
            enero: { cantidad: 0, valor: 0 },
            febrero: { cantidad: 3, valor: 4577.18 },
            marzo: { cantidad: 1, valor: 1000.76 },
          },
        ],
      },
     
    ];
  }

  loadPrediosReport() {
    // poner aqui ruta del backend desplegado
    this.http.get<any[]>('http://localhost:3020/reporte/resumen/predios').subscribe({
      next: (data: any) => {
        this.products = this.formatData(data?.respuesta || []);
        this.cd.detectChanges();
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los productos' });
        console.error('Error loading products', error);
      }
    });
  }

  formatData(data: any[]): IReportItem[] {
    const monthMap: { [key: string]: string } = {
      'ENERO': 'enero', 'FEBRERO': 'febrero', 'MARZO': 'marzo', 'ABRIL': 'abril',
      'MAYO': 'mayo', 'JUNIO': 'junio', 'JULIO': 'julio', 'AGOSTO': 'agosto',
      'SETIEMBRE': 'septiembre', 'SEPTIEMBRE': 'septiembre', 'OCTUBRE': 'octubre',
      'NOVIEMBRE': 'noviembre', 'DICIEMBRE': 'diciembre'
    };

    const cgMap = new Map<string, IReportItem>();

    data.forEach((item, index) => {
      const cgName = item.cg;
      const projectName = item.proyecto;
      const monthKey = monthMap[item.mes];

      if (!monthKey) return;

      const cantidad = parseFloat(item.cantidad_registros || '0');
      const valor = parseFloat(item.total_valor_estimado || '0');

      if (!cgMap.has(cgName)) {
        cgMap.set(cgName, {
          id: 1000 + index,
          name: cgName,
          orders: [],
          enero: { cantidad: 0, valor: 0 }, febrero: { cantidad: 0, valor: 0 }, marzo: { cantidad: 0, valor: 0 },
          abril: { cantidad: 0, valor: 0 }, mayo: { cantidad: 0, valor: 0 }, junio: { cantidad: 0, valor: 0 },
          julio: { cantidad: 0, valor: 0 }, agosto: { cantidad: 0, valor: 0 }, septiembre: { cantidad: 0, valor: 0 },
          octubre: { cantidad: 0, valor: 0 }, noviembre: { cantidad: 0, valor: 0 }, diciembre: { cantidad: 0, valor: 0 }
        });
      }

      const cgEntry = cgMap.get(cgName)! as any;

      //totales por CG
      if (cgEntry[monthKey]) {
        cgEntry[monthKey].cantidad += cantidad;
        cgEntry[monthKey].valor += valor;
      }

      // proyectos por CG
      let order = cgEntry.orders.find((o: any) => o.id === projectName);
      if (!order) {
        order = {
          id: projectName,
          enero: { cantidad: 0, valor: 0 }, febrero: { cantidad: 0, valor: 0 }, marzo: { cantidad: 0, valor: 0 },
          abril: { cantidad: 0, valor: 0 }, mayo: { cantidad: 0, valor: 0 }, junio: { cantidad: 0, valor: 0 },
          julio: { cantidad: 0, valor: 0 }, agosto: { cantidad: 0, valor: 0 }, septiembre: { cantidad: 0, valor: 0 },
          octubre: { cantidad: 0, valor: 0 }, noviembre: { cantidad: 0, valor: 0 }, diciembre: { cantidad: 0, valor: 0 }
        };
        cgEntry.orders.push(order);
      }

      const orderAny = order as any;
      //totales por proyecto
      if (orderAny[monthKey]) {
        orderAny[monthKey].cantidad += cantidad;
        orderAny[monthKey].valor += valor;
      }
    });

    return Array.from(cgMap.values());
  }

  expandAll() {
    this.expandedRows = {};
    for (const p of this.products) {
      this.expandedRows[p.id] = true;
    }
    // this.messageService.add({ severity: 'info', summary: 'Expanded', detail: 'All rows expanded' });
  }

  collapseAll() {
    this.expandedRows = {};
    // this.messageService.add({ severity: 'info', summary: 'Collapsed', detail: 'All rows collapsed' });
  }

  onRowExpand(event: any) {
    const name = event.data?.name ?? 'Item';
    // this.messageService.add({ severity: 'info', summary: 'Row Expanded', detail: name });
  }

  onRowCollapse(event: any) {
    const name = event.data?.name ?? 'Item';
    // this.messageService.add({ severity: 'info', summary: 'Row Collapsed', detail: name });
  }

  getSeverity(status: string) {
    switch ((status || '').toUpperCase()) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  getStatusSeverity(status: string) {
    switch ((status || '').toUpperCase()) {
      case 'DELIVERED':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'info';
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class ReporteTabla {
  products: IReportItem[] = [];
  expandedRows: { [key: string]: boolean } = {};

  constructor(private messageService: MessageService) {
    this.loadProducts();
  }

  loadProducts() {
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

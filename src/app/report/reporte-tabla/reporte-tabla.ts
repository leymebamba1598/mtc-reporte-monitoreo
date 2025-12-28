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

@Component({
  selector: 'app-reporte-tabla',
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule, ToastModule, RatingModule, TagModule, RippleModule, FormsModule],
  templateUrl: './reporte-tabla.html',
  styleUrls: ['./reporte-tabla.css'],
  providers: [MessageService],
})
export class ReporteTabla {
  products: any[] = [];
  expandedRows: { [key: string]: boolean } = {};

  constructor(private messageService: MessageService) {
    this.loadProducts();
  }

  loadProducts() {
    this.products = [
      {
        id: 1000,
        name: 'Bamboo Watch',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        rating: 4,
        inventoryStatus: 'INSTOCK',
        orders: [
          { id: 1, mes: 'Enero', date: '2025-12-20', amount: 30, status: 'DELIVERED' },
          { id: 2, mes: 'Febrero', date: '2025-12-21', amount: 35, status: 'PENDING' },
        ],
      },
      {
        id: 1001,
        name: 'Phone Case',
        image: 'phone-case.jpg',
        price: 15,
        category: 'Accessories',
        rating: 3,
        inventoryStatus: 'LOWSTOCK',
        orders: [
          { id: 3, customer: 'Alice', date: '2025-12-18', amount: 15, status: 'DELIVERED' },
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

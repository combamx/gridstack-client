import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DetalleVentumService, DetalleVentum } from '../../services/detalle-ventum.service';

@Component({
  selector: 'app-detalle-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})

export class DetalleVentasComponent implements OnInit {
  detalles: DetalleVentum[] = [];

  nuevoDetalle: DetalleVentum = this.inicializarDetalle();
  editando: boolean = false;

  constructor(private detalleService: DetalleVentumService) {}

  ngOnInit(): void {
    this.cargarDetalles();
  }

  cargarDetalles(): void {
    this.detalleService.getDetalleVentas().subscribe((data) => {
      this.detalles = data;
    });
  }

  guardarDetalle(): void {
    if (this.editando) {
      this.detalleService.updateDetalleVenta(this.nuevoDetalle.id, this.nuevoDetalle).subscribe(() => {
        this.resetFormulario();
        this.cargarDetalles();
      });
    } else {
      this.detalleService.addDetalleVenta(this.nuevoDetalle).subscribe(() => {
        this.resetFormulario();
        this.cargarDetalles();
      });
    }
  }

  editarDetalle(detalle: DetalleVentum): void {
    this.nuevoDetalle = { ...detalle };
    this.editando = true;
  }

  eliminarDetalle(id: number): void {
    if (confirm('¿Estás seguro de eliminar este detalle de venta?')) {
      this.detalleService.deleteDetalleVenta(id).subscribe(() => {
        this.cargarDetalles();
      });
    }
  }

  resetFormulario(): void {
    this.nuevoDetalle = this.inicializarDetalle();
    this.editando = false;
  }

  inicializarDetalle(): DetalleVentum {
    return {
      id: 0,
      ventaId: 0,
      productoId: 0,
      cantidad: 1,
      precioUnitario: 0,
      subtotal: 0
    };
  }

  calcularSubtotal(): void {
    const cantidad = this.nuevoDetalle.cantidad || 0;
    const precio = this.nuevoDetalle.precioUnitario || 0;
    this.nuevoDetalle.subtotal = cantidad * precio;
  }

}

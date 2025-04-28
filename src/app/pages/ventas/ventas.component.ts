import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VentaService, Venta } from '../../services/venta.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: Venta[] = [];
  nuevaVenta: Venta = this.initVenta();
  editando: boolean = false;

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.ventaService.getVentas().subscribe((data) => {
      this.ventas = data;
    });
  }

  guardarVenta(): void {
    if (this.editando) {
      this.ventaService.updateVenta(this.nuevaVenta.id, this.nuevaVenta).subscribe(() => {
        this.resetFormulario();
        this.cargarVentas();
      });
    } else {
      this.ventaService.addVenta(this.nuevaVenta).subscribe(() => {
        this.resetFormulario();
        this.cargarVentas();
      });
    }
  }

  editarVenta(venta: Venta): void {
    this.nuevaVenta = { ...venta };
    this.editando = true;
  }

  eliminarVenta(id: number): void {
    if (confirm('¿Deseas eliminar esta venta?')) {
      this.ventaService.deleteVenta(id).subscribe(() => {
        this.cargarVentas();
      });
    }
  }

  resetFormulario(): void {
    this.nuevaVenta = this.initVenta();
    this.editando = false;
  }

  private initVenta(): Venta {
    return {
      id: 0,
      fecha: new Date().toISOString().split('T')[0],
      total: 0
    };
  }
}

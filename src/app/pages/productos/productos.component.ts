import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {
  productos: Producto[] = [];

  // Para agregar/editar productos
  nuevoProducto: Producto = this.inicializarProducto();
  editando: boolean = false;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  agregarProducto(): void {
    if (this.editando) {
      this.productoService.updateProducto(this.nuevoProducto.id, this.nuevoProducto).subscribe(() => {
        this.resetFormulario();
        this.cargarProductos();
      });
    } else {
      this.productoService.addProducto(this.nuevoProducto).subscribe(() => {
        this.resetFormulario();
        this.cargarProductos();
      });
    }
  }

  editarProducto(producto: Producto): void {
    this.nuevoProducto = { ...producto };
    this.editando = true;
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe(() => {
        this.cargarProductos();
      });
    }
  }

  resetFormulario(): void {
    this.nuevoProducto = this.inicializarProducto();
    this.editando = false;
  }

  inicializarProducto(): Producto {
    return {
      id: 0,
      nombre: '',
      categoria: '',
      precio: 0,
      stock: 0,
      imagenUrl: ''
    };
  }
}

import { RouterOutlet } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { ProductoService, Producto } from '../../services/producto.service';
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';

@Component({
  selector: 'app-grid-stack',
  imports: [RouterOutlet],
  templateUrl: './grid-stack.component.html',
  styleUrl: './grid-stack.component.css'
})
export class GridStackComponent {
title = 'gridstack-angular-example';
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngAfterViewInit(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data.slice(0, 10); // Solo los primeros 10

      const grid = GridStack.init({
        disableResize: true,
        float: true,
        alwaysShowResizeHandle: 'mobile',
        cellHeight: 450,
        column: 4, // orden horizontal de hasta 4 columnas
      });

      this.productos.forEach((producto, index) => {

        const widget = document.createElement('div');

        widget.className = 'grid-stack-item';
        widget.setAttribute('gs-x', (index % 4).toString());
        widget.setAttribute('gs-y', Math.floor(index / 4).toString());
        widget.setAttribute('gs-w', '1');
        widget.setAttribute('gs-auto-position', 'true');
        //widget.setAttribute('gs-h', '3');

        widget.innerHTML = `
          <div class="grid-stack-item-content p-2 bg-light border rounded">
            <h5>${producto.nombre}</h5>
            <p>${producto.categoria}</p>
            <p><strong>$${producto.precio}</strong></p>
            <img src="${producto.imagenUrl}" width="100%" />
          </div>
        `;

        grid.addWidget(widget);

      });

    });
  }
}

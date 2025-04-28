import { Routes } from '@angular/router';
import { ProductosComponent } from '../app/pages/productos/productos.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { DetalleVentasComponent } from './pages/detalle-ventas/detalle-ventas.component';
import { GridStackComponent } from './pages/grid-stack/grid-stack.component';

export const routes: Routes = [
  { path: '', redirectTo: 'grid-stack', pathMatch: 'full' }, // ✅ redirige a 'productos'
  { path: 'grid-stack', component: GridStackComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'detalle-ventas', component: DetalleVentasComponent },

  { path: '**', redirectTo: 'productos' } // opcional: ruta 404
];

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DetalleVentum {
  id: number;
  ventaId: number;
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  producto?: any;
  venta?: any;
}

@Injectable({ providedIn: 'root' })
export class DetalleVentumService {
  private apiUrl = 'https://localhost:7145/api/DetalleVentum';

  constructor(private http: HttpClient) {}

  // Obtener todos los detalles de venta
  getDetalleVentas(): Observable<DetalleVentum[]> {
    return this.http.get<DetalleVentum[]>(this.apiUrl);
  }

  // Obtener un detalle por ID
  getDetalleVentaById(id: number): Observable<DetalleVentum> {
    return this.http.get<DetalleVentum>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo detalle
  addDetalleVenta(detalle: DetalleVentum): Observable<DetalleVentum> {
    return this.http.post<DetalleVentum>(this.apiUrl, detalle);
  }

  // Actualizar un detalle
  updateDetalleVenta(id: number, detalle: DetalleVentum): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, detalle);
  }

  // Eliminar un detalle
  deleteDetalleVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

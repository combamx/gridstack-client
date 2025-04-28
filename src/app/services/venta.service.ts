import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Venta {
  id: number;
  fecha: string; // formato ISO string: "2025-04-28T12:34:56"
  total: number;
}

@Injectable({
  providedIn: 'root'
})

export class VentaService {

  private apiUrl = 'https://localhost:7145/api/Venta';

  constructor(private http: HttpClient) {}

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  getVenta(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  addVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, venta);
  }

  updateVenta(id: number, venta: Venta): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, venta);
  }

  deleteVenta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

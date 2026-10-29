
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../Modelo/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  // Ajusta tu URL según el puerto de tu backend en Java
  private baseURL = "http://localhost:8000/api/empleados"; 

  constructor(private httpClient: HttpClient) { }

  obtenerEmpleados(): Observable<Empleado[]> {
    return this.httpClient.get<Empleado[]>(this.baseURL);
  }

  guardarEmpleado(empleado: Empleado): Observable<Object> {
    return this.httpClient.post(this.baseURL, empleado);
  }

  // NUEVO: Método para actualizar (Editar)
  actualizarEmpleado(id: number, empleado: Empleado): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${id}`, empleado);
  }

  // NUEVO: Método para eliminar
  eliminarEmpleado(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
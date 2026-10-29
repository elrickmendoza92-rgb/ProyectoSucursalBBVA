
import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../Controlador/empleado.service';
import { Empleado } from '../../Modelo/empleado';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  listaEmpleados: Empleado[] = [];

  nuevoEmpleado: Empleado = {
    nss: '',
    nombre: '',
    app: '',
    apm: '',
    sueldo: 0
  };

  // Variable para controlar si estamos editando y guardar el ID seleccionado
  editando: boolean = false;
  idEmpleadoEditando?: number;

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados(): void {
    this.empleadoService.obtenerEmpleados().subscribe(
      data => { this.listaEmpleados = data; },
      error => { console.error('Error al cargar empleados:', error); }
    );
  }

  guardarFormulario(): void {
    if (this.editando && this.idEmpleadoEditando) {
      // SI ESTAMOS EDITANDO
      this.empleadoService.actualizarEmpleado(this.idEmpleadoEditando, this.nuevoEmpleado).subscribe(
        response => {
          alert('¡Empleado actualizado con éxito!');
          this.resetFormulario();
          this.cargarEmpleados();
        },
        error => { console.error('Error al actualizar:', error); }
      );
    } else {
      // SI ES UN NUEVO REGISTRO
      this.empleadoService.guardarEmpleado(this.nuevoEmpleado).subscribe(
        response => {
          alert('¡Empleado guardado con éxito!');
          this.resetFormulario();
          this.cargarEmpleados();
        },
        error => { console.error('Error al guardar:', error); }
      );
    }
  }

  // Carga los datos en el formulario para poder editarlos
  prepararActualizacion(emp: Empleado): void {
    this.editando = true;
    this.idEmpleadoEditando = emp.id;
    this.nuevoEmpleado = { ...emp }; // Copia los datos al formulario
  }

  // Eliminar empleado
  eliminar(id?: number): void {
    if (!id) return;
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe(
        response => {
          alert('¡Empleado eliminado con éxito!');
          this.cargarEmpleados();
        },
        error => { console.error('Error al eliminar:', error); }
      );
    }
  }

  // Limpiar formulario y salir del modo edición
  resetFormulario(): void {
    this.editando = false;
    this.idEmpleadoEditando = undefined;
    this.nuevoEmpleado = { nss: '', nombre: '', app: '', apm: '', sueldo: 0 };
  }
}


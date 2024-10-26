import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeModel } from '../../class/Employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

//
  employeeForm: FormGroup = new FormGroup({}); //el formulario
  employeeObj: EmployeeModel = new EmployeeModel(); //instanciar la classe de employeeModel
  employeeList: EmployeeModel[] = []; //array de lista vacia llamada employeeList
  isEditMode: boolean = false; //editable para el uso de editar

  constructor() { //constructor para crear la forma y guardar datos en la local storage
    this.createForm();//crear forma
    if(typeof window !== 'undefined'){ //si es undefined, 
      const oldData = localStorage.getItem("EmpData"); //obtener datos de local Storage
      if(oldData != null){
        const parseData = JSON.parse(oldData);
        this.employeeList = parseData; //si la lista no esta null, ingresar nueva lista de empleado, convertir datos. 
      }
    }
  }

  //funcion de crear forma, usar formcontrol de html para enlazar datos. employee form 
  createForm() {
    debugger;
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      phone: new FormControl(this.employeeObj.phone),
      emailId: new FormControl(this.employeeObj.emailId),
      pinCode: new FormControl(this.employeeObj.pinCode, [Validators.required, Validators.minLength(4)]),
      state: new FormControl(this.employeeObj.state),
    });
  }

  onSave() {
    debugger;
    const oldData = localStorage.getItem("EmpData");
    let newEmpId = 1;

    if (oldData != null) {
      const parseData = JSON.parse(oldData);
      // Obtener el siguiente empId único basado en el valor más alto existente
      newEmpId = Math.max(...this.employeeList.map(e => e.empId || 0)) + 1;
      //  Esto asegura que el empId sea único, incluso si se borra algún registro.
    }
    
    //  Asignar el nuevo empId al formulario y agregar el nuevo empleado
    this.employeeForm.controls['empId'].setValue(newEmpId);
    this.employeeList.unshift(this.employeeForm.value);
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    
    // Mensaje de consola para seguimiento
    console.log(`Guardado nuevo empleado con empId: ${newEmpId}`);
    this.resetForm();
  }

  //funcion onEdit usada al presionar el boton edit 
  onEdit(item: EmployeeModel) {
    debugger;
    this.isEditMode = true; // booleano convertido en cierto
    this.employeeObj = item;

    // Actualizar el formulario con los datos del registro seleccionado
    this.employeeForm.patchValue({
      empId: item.empId,
      name: item.name,
      city: item.city,
      address: item.address,
      phone: item.phone,
      emailId: item.emailId,
      pinCode: item.pinCode,
      state: item.state
    });

    // Mensaje de consola para depurar
    console.log(`Editando empleado con empId: ${item.empId}`);
  }

  onUpdate() {
    debugger;
    // Obtener empId del formulario y buscar el índice en `employeeList`
    const empId = this.employeeForm.controls['empId'].value;
    const index = this.employeeList.findIndex(m => m.empId === empId);

    if (index !== -1) {
      //  Actualizar el registro existente en employeeList en el índice encontrado
      this.employeeList[index] = this.employeeForm.value;
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      
      // Mensaje de consola para confirmar actualización
      console.log(`Actualizado empleado con empId: ${empId} en el índice: ${index}`);
    } else {
      // Error si `empId` no se encuentra en `employeeList`
      console.error(`Empleado con empId ${empId} no encontrado en employeeList`);
    }

    this.resetForm(); // limpiar la forma
  }

  //funcion para borar usuario
  onDelete(id: number) {
    debugger;
    const isDelete = confirm("¿Estás seguro de que quieres eliminar?");
    if (isDelete) {
      // Buscar el índice del registro a eliminar en employeeList
      const index = this.employeeList.findIndex(m => m.empId === id);
      if (index !== -1) {
        //  Eliminar el registro y actualizar localStorage
        this.employeeList.splice(index, 1);
        localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
        
        // Mensaje de consola para confirmar eliminación
        console.log(`Eliminado empleado con empId: ${id}`);
      } else {
        // Error si empId no se encuentra
        console.error(`Empleado con empId ${id} no encontrado para eliminación`);
      }
    }
  }

  resetForm() {
    debugger;
    // Restablecer formulario y salir de modo de edición
    this.isEditMode = false;
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
}
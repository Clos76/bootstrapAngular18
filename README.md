# Bootstrap Y Angular 18 implementando Base de Datos y almacenamiento local

Este proyecto fue generado por Angular CLI versión 18.2.5 y Bootstrap 5.3.3

## Servidor de desarrollo

Ingresar ng serve para un dev servidor Navega al url indicado o a http://localhost:4200/. La aplicación se cargará automáticamente si hay algún cambio.

## Build

Ingresa un build para crear el proyecto. Los artefactos del build serán guardados en el directorio.


## Descripción General

Este proyecto está realizado en Angular 18, con la implementación de Bootstrap 5.3.3 para las animaciones. La aplicación permite navegar a diferentes partes por medio de rutas. El usuario es introducido a la página inicial o Home la cual contiene el primer uso de los componentes de bootstrap. Aquí podemos ver la implementación de la navegación implementando la barra de navegación que se basan al usar .nav. Esta tiene diferentes opciones para que el usuario pueda escoger. Se utilizó la documentación proporcionada por Bootstrap para poder ver la implementación de los diferentes componentes en https://getbootstrap.com/docs/5.3/components. Se seleccionó el nav bar más adecuado para el uso de la página. Siguiendo con la página de productos, se implementó el uso del componente de carrusel. Este es un componente de presentación de diapositivas o imágenes para recorrer elementos como un carrusel. Se buscaron imágenes gratis para usar en pexels.com. En la página de Usuarios, podemos ver el uso de diferentes componentes como botones dinámicos, formas y tablas. En la página de Usuarios, se implementó el uso de una base de datos en la cual se pueden guardar usuarios o artículos y guardarlos en el almacén local del navegador. Se implementó el uso de las operaciones CRUD en las cuales se codificaron para poder guardar un usuario, editar un usuario, borrar un usuario y mostrar un usuario. La interfaz está diseñada con Bootstrap para proporcionar una experiencia agradable para el usuario y fácil de entender. Los elementos de Bootstrap ayudaron a que la aplicación fuera responsiva y moderna. 

## Características

- **Interfaz Responsiva**: La aplicación utiliza Bootstrap para garantizar que sea accesible en dispositivos móviles y de escritorio ya que cuenta con optimización para estos dispositivos.
  
- **Gestion de Clientes**: Se creó una interfaz en la cual se puede agregar, visualizar, editar y eliminar a clientes. La aplicación cuenta con diferentes rutas. La ruta /cart es la ruta en la cual se pueden ver la interfaz de agregación de empleados y la visualización de todos los empleados agregados. Se utilizó el formulario de Bootstrap al igual que la implementación de control del formulario.
 
- **Utilización de componentes Bootstrap**: Para crear una aplicación moderna y rápida, se utilizaron diferentes componentes brindados por Bootstrap en su página oficial. Se implementó el uso de la barra de navegación con diferentes estilos preestablecidos ya que solo se tenía que llamar la clase para hacer uso de ellos. Se implementó el uso de carruseles en las páginas de navegación /home y /productos. Se implemento el uso de botones interactivos los cuales al llamar su clase cambian de color.
  
- **Navegación Intuitiva**: Al utilizar diferentes rutas para la navegación, se implementó el uso de clases en los enlaces y form-control las cuales fueron enlazadas a diferentes partes de la página. Una vez una página era seleccionada, se cambió el color de la barra de navegación. Al cambiar la ruta también el botón con el enlace se coloreaba.
 
- **Validacion de Formulario**: Se implementó el formulario en la página usuarios la cual tenía la ruta llamada /carta. Al implementar los formularios de Bootstrap, se pudo aprovechar el uso de los atributos de type por ejemplo en el correo electrónico y los números. Se implementó el uso de restricciones, ya que para poder ingresar un nuevo empleado, es requerido que el formulario tenga un nombre y un pin code el cual tiene que ser de 4 dígitos mínimos para que se pueda activar el botón de guardar.
 
- **Creación de Base de Datos**: Se creó una base de datos programada para poder guardar los nuevos empleados de forma local en el navegador. Esto ayudará para que cuando esta aplicación se utiliza cuando no hay acceso a internet, se puedan guardar los usuarios localmente. Una vez que se restablezca la señal de internet, se pueden agregar los usuarios a una base en la nube.
  
- **Componentes CRUD**: Se creó un componente en el cual se realizaron las operaciones del Create, Read, Update, Delete. Se utilizaron clases y métodos para poder enlazar la página html con la página componentes. Al usar formControl en los diferentes campos como el nombre, contacto y correo electrónico, se pudo registrar estos datos a la lista de empleados llamada Employee list.
  
- **Uso de funciones y clases**: Una vez el formulario creado, se presionaba el botón de guardar. Esto accionaba la función de onSave() la cual guardaba el nuevo registro en la memoria local del navegador. Se mostraban los trabajadores en la lista de trabajadores. Si se desea editar un trabajador, se presionaba el botón estilizado con Bootstrap de edit, el cual llamaba la función de onEdit(). Al presionar editar, la información del trabajador se subía al formulario, en el cual se podían hacer los cambios. Se activa el botón Update Employee con estilo warning de Bootstrap. Una vez presionado este botón, se guardaba nuevamente el trabajador.
  
- ![Screenshot 2024-10-25 at 8 27 34 PM](https://github.com/user-attachments/assets/fb2b578b-ff91-45a3-9d66-b591977e893f)
  
![Screenshot 2024-10-25 at 8 28 40 PM](https://github.com/user-attachments/assets/31d87daf-83db-4fd7-9b05-db95bb0e1e67)

![Screenshot 2024-10-25 at 8 29 28 PM](https://github.com/user-attachments/assets/7ed3543c-eec1-4c51-abd5-11af6a3865ca)

- 

## Codigo de Ejemplo

** Employee.ts **

export class EmployeeModel {
    empId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    phone: string;
    address: string;
    pinCode: string;

    //Las clases necesita el constructor, crear classe de employee para usar en la interfase
    constructor() {
this.address = "";
this.city = "";
this.state = "";
this.phone = "";
this.name = "";
this.emailId="";
this.empId = 1;
this.pinCode = "";
    }

}

## Codigo de Ejemplo

** cart.component.ts **

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

## Codigo de Ejemplo

** app.component.html **

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Bienvenido</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!-- Aplicar 'active' y 'menu-highlight' al botón de Home para mostrar pagina actual en navegacion -->
          <button class="btn btn-outline-success" routerLink="/home" routerLinkActive="active menu-highlight">Home</button>
        </li>
        <li class="nav-item">
          <!-- Aplicar 'active' y 'menu-highlight' al botón de Products para mostrar pagina actual en navegacion  -->
          <button class="btn btn-outline-success" routerLink="/products" routerLinkActive="active menu-highlight">Products</button>
        </li>
        <li class="nav-item">
          <!-- Aplicar 'active' y 'menu-highlight' al botón de Usuarios para mostrar pagina actual en navegacion -->
          <button class="btn btn-outline-success" routerLink="/cart" routerLinkActive="active menu-highlight">Usuarios</button>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Acciones</a></li>
            <li><a class="dropdown-item" href="#">Bootstrap</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Enlaces</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>



<router-outlet />


  
## Estructura de Proyecto
* /src/app/class/Employee.ts: Esta es la clase del empleado creada la que incluye todos los datos necesarios para poder usar la clase. Se implementó el uso del constructor para poder iniciar las variables que guardarán los datos del trabajador.
* /src/app/pages/cart/cart.component.ts: Esta es la página en la cual se encuentra el código del backend que utiliza los datos de la página html y los guarda en el almacenamiento local.
* /src/app/pages/cart/cart.component.html: Esta es la página en la cual se implementa el uso de diferentes componentes de Bootstrap como el llamado y uso de classes cómo mb-3, form-check, form-control, y botones con clases como alert, primary y secondary.
* /src/app/pages/home/home.component.html: La página principal de la aplicación. Se emplea el uso de el navbar de Bootstrap, el uso del carrusel, imágenes interactivas y botones con enlaces. 



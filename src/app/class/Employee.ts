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
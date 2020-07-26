import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { firstLetterCapitalize } from 'backend/src/Utilities';
import { Toast, SwalConfirm } from 'src/app/shared/util';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  currentUser: any = {
    tipoUsuario: {
      id: ''
    }
  };

  @Input()
  customerId: number;

  @Input()
  formType: string;

  @Output()
  formEvent = new EventEmitter();

  form = new FormGroup({
    id: new FormControl(''),
    role: new FormControl({}, Validators.required),
    rut: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    canLogin: new FormControl(true, Validators.required)
  })

  passwordMatch: boolean;

  userRoleList: any = [];

  constructor(private _userService: UserService, private _routerService: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    this.getUserRoles();
    this.initForm(this.formType);
    this.getCurrentUser();
  }

  getCurrentUser(){
    const token = this._authService.getToken();
    this._authService.getCurrentUser(token).subscribe((result: Object) => {
      this.currentUser = result;
    });
  }

  getUserRoles(){
    this._userService.getUserRoles().subscribe((result: any)=> {
      result.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.tipo),
          value: element
        }
        if(element.id == 2 || element.id == 6){
          this.userRoleList.push(obj);
        }
      });
    }, (error) => {
      console.error(error);
    })
  }

  initForm(formType: string){
    if(this.formType == 'edit'){

      this._userService.getUser(this.customerId).subscribe((result: any) => {

        this.setFormByRole(result.tipoUsuario.tipo);

        if(result.tipoUsuario.tipo == 'empresa'){
          this.form.removeControl('name');
          this.form.removeControl('secondName');
          this.form.removeControl('lastName');
          this.form.removeControl('secondLastName');

          this.form.setValue({
            id: result.id,
            role: result.tipoUsuario,
            rut: result.rut,
            password: '',
            confirmPassword: '',
            companyName: result.detalle.nombre,
            address: result.detalle.direccion,
            province: result.detalle.comuna,
            phone: result.detalle.telefono,
            email: result.detalle.email,
            contactPerson: result.detalle.personaContacto,
            canLogin: result.habilitado
          });
        }else{
          this.form.removeControl('companyName');
          this.form.removeControl('address');
          this.form.removeControl('province');
          this.form.removeControl('contactPerson');

          this.form.setValue({
            id: result.id,
            role: result.tipoUsuario,
            rut: result.rut,
            password: '',
            confirmPassword: '',
            name: result.detalle.nombre,
            secondName: result.detalle.segundoNombre,
            lastName: result.detalle.apellido,
            secondLastName: result.detalle.segundoApellido,
            email: result.detalle.email ? result.detalle.email : '',
            phone: result.detalle.telefono ? result.detalle.telefono : '',
            canLogin: result.habilitado,
          });
        }

        this.form.get('password').clearValidators();
        this.form.get('confirmPassword').clearValidators();
        this.form.get('password').updateValueAndValidity();
        this.form.get('confirmPassword').updateValueAndValidity();

        this.confirmPassword('');
      }, () => {
        Toast.fire({
          icon:'error',
          titleText: 'Favor recarga la página'
        })
      })

    }else{
      this.setFormByRole('blank');
    }
  }

  confirmPassword(cp: any){
    if(cp == ''){
      this.passwordMatch = true;
      return true;
    }else{
      const confirmPassword = cp.value;
      if(this.form.value.password == confirmPassword){
        this.passwordMatch = true;
        return true;
      }
      this.passwordMatch = false;
      return false;
    }
  }

  sendForm(){
    if(!this.form.valid){
      Toast.fire({
        icon: 'warning',
        titleText: 'Formulario incompleto'
      })
      return;
    }

    this.formEvent.emit(this.form.value);
  }

  setFormByRole(role: string){
    if(role == 'empresa'){
      this.form.removeControl('name');
      this.form.removeControl('secondName');
      this.form.removeControl('lastName');
      this.form.removeControl('secondLastName');
      this.form.removeControl('email');
      this.form.removeControl('phone');

      this.form.addControl('companyName', new FormControl('', Validators.required));
      this.form.addControl('address', new FormControl('', Validators.required));
      this.form.addControl('province', new FormControl('', Validators.required));
      this.form.addControl('phone', new FormControl('', Validators.required));
      this.form.addControl('email', new FormControl('', Validators.required));
      this.form.addControl('contactPerson', new FormControl('', Validators.required));
    }else{
      this.form.removeControl('companyName');
      this.form.removeControl('address');
      this.form.removeControl('province');
      this.form.removeControl('phone');
      this.form.removeControl('email');
      this.form.removeControl('contactPerson');

      this.form.addControl('name', new FormControl('', Validators.required));
      this.form.addControl('secondName', new FormControl('', Validators.required));
      this.form.addControl('lastName', new FormControl('', Validators.required));
      this.form.addControl('secondLastName', new FormControl('', Validators.required));
      this.form.addControl('email', new FormControl(''));
      this.form.addControl('phone', new FormControl(''));
    }
  }

  delete(){
    SwalConfirm.fire({
      icon: 'warning',
      titleText: 'Confirmar acción',
      html: 'Eliminarás este cliente de manera definitiva'
    }).then(result => {
      if(result.value){
        this._userService.delete(this.customerId).subscribe(result => {
          Toast.fire({
            icon: 'info',
            titleText: 'Cliente eliminado'
          });
          return this._routerService.navigate(['/admin/clientes']);
        })
      }
    })
  }

}

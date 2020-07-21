import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Toast, SwalConfirm } from 'src/app/shared/util';
import { UserService } from 'src/app/admin/user-module/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {

  @Input()
  formType: string = 'create';

  @Output()
  formEvent = new EventEmitter();

  form = new FormGroup({
    id: new FormControl(''),
    rut: new FormControl('', Validators.required),
    role: new FormControl({id: 4, tipo: 'proveedor', activo: 1}, Validators.required), // Tipo Usuario ID
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactPerson: new FormControl('', Validators.required),
    canLogin: new FormControl(true, Validators.required),
  });

  passwordMatch: any;

  constructor(private _userService: UserService, private _activatedRoute: ActivatedRoute, private _routerService: Router) { }

  ngOnInit(): void {
    this.initForm(this.formType);
  }

  initForm(type: string){
    if(type == 'edit'){
      this._activatedRoute.params.subscribe(params => {
        const id = params['id'];
        this._userService.getUser(id).subscribe((user: any) => {
          this.form.setValue({
            id: user.id,
            rut: user.rut,
            role: user.tipoUsuario,
            password: '',
            confirmPassword: '',
            companyName: user.detalle.nombre,
            address: user.detalle.direccion,
            province: user.detalle.comuna,
            phone: user.detalle.telefono,
            email: user.detalle.email,
            contactPerson: user.detalle.personaContacto,
            canLogin: user.habilitado
          });

          this.form.get('password').clearValidators();
          this.form.get('confirmPassword').clearValidators();
          this.form.get('password').updateValueAndValidity();
          this.form.get('confirmPassword').updateValueAndValidity();

          this.confirmPassword('');
        })
      });
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

  deleteProvider(){
    SwalConfirm.fire({
      icon: 'warning',
      titleText: 'Confirmar acción',
      html: 'Eliminarás este proveedor de manera definitiva'
    }).then(result => {
      if(result.value){
        this._activatedRoute.params.subscribe(params => {
          this._userService.delete(params['id']).subscribe(result => {
            Toast.fire({
              icon: 'info',
              titleText: 'Proveedor eliminado'
            });
            return this._routerService.navigate(['/admin/proveedores']);
          })
        })
      }
    })
  }

  sendForm(){
    if(!this.form.valid){
      return Toast.fire({
        icon: 'warning',
        titleText: 'Formulario incompleto'
      });
    }

    this.formEvent.emit(this.form.value);
  }

}

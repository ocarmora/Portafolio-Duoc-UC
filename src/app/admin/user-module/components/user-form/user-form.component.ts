import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SelectItem } from 'primeng/api';
import { firstLetterCapitalize } from 'backend/src/Utilities';
import { Toast, SwalConfirm } from 'src/app/shared/util';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input()
  userId: number;

  @Input()
  formType: string;

  passwordMatch = false;
  userRoleList: SelectItem[] = [];

  @Output()
  formEvent = new EventEmitter();

  form = new FormGroup({
    id: new FormControl(''),
    rut: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    secondLastName: new FormControl('', Validators.required),
    canLogin: new FormControl(true, Validators.required),
  });

  constructor(private _userService: UserService, private _activatedRoute: ActivatedRoute, private _routerService: Router) { }

  ngOnInit(): void {
    this.getUserRoles();
    this.initForm();
  }

  getUserRoles(){
    this._userService.getUserRoles().subscribe((result: any)=> {
      result.forEach(element => {
        let obj = {
          label: firstLetterCapitalize(element.tipo),
          value: element
        }
        if(element.id !== 2 && element.id !== 4 && element.id !== 6){
          this.userRoleList.push(obj);
        }
      });
    }, (error) => {
      console.error(error);
    })
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

  initForm(){
    if(this.formType == 'edit'){
      this._userService.getUser(this.userId).subscribe((result: any) => {

        this.form.setValue({
          id: result.id,
          rut: result.rut,
          role: result.tipoUsuario,
          password: '',
          confirmPassword: '',
          name: result.detalle.nombre,
          secondName: result.detalle.segundoNombre,
          lastName: result.detalle.apellido,
          secondLastName: result.detalle.segundoApellido,
          canLogin: result.habilitado,
        });

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

    this.formEvent.emit(this.form);
  }

  delete(){
    SwalConfirm.fire({
      icon: 'warning',
      titleText: 'Confirmar acción',
      html: 'Eliminarás este usuario de manera definitiva'
    }).then(result => {
      if(result.value){
        this._userService.delete(this.userId).subscribe(result => {
          Toast.fire({
            icon: 'info',
            titleText: 'Usuario eliminado'
          });
          return this._routerService.navigate(['/admin/usuarios']);
        })
      }
    })
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-modifty-user',
  templateUrl: './modifty-user.component.html',
  styleUrls: ['./modifty-user.component.css']
})
export class ModiftyUserComponent implements OnInit {
  uid: string;
  age: string | undefined

  formData!: FormGroup;
  constructor( @Inject(MAT_DIALOG_DATA) data: any, 
                private usersService: UsersService,
                private fb: FormBuilder,
                public iziToast: Ng2IzitoastService ) {
    this.uid = data.id;
  }
  
  
  

  ngOnInit(): void {
    this.uid == '' ? '' :this.getUser()
    this.formData = this.fb.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      date_bird: [''],
      number_phone: ['', [Validators.min(10), Validators.max(10)]],
    })
  }


  getUser(){
    this.usersService.getUser(this.uid).subscribe( (respGetid: any ) => {
      this.formData.controls['name'].setValue(respGetid.user.name)
      this.formData.controls['lastName'].setValue(respGetid.user.lastName)
      this.formData.controls['number_phone'].setValue(respGetid.user.number_phone)
      this.formData.controls['date_bird'].setValue(respGetid.user.date_bird)
      this.formData.controls['identification'].setValue(respGetid.user.identification)
      this.age=respGetid.user.age
    })
  }

  userinfo() {
    this.formData.controls['date_bird'].setValue ( moment( this.formData.get('date_bird')?.value).format('YYYY/MM/DD HH:mm:ss')) 
    if(this.uid == ''){
      this.usersService.createUser(this.formData.value).subscribe((resp:any) => {

        if(resp.Ok == true){
          this.iziToast.success({
            title: 'Correcto',
            message: resp.msg
          });
        }
       
      })
    } else {
      this.usersService.put(this.uid, this.formData.value).subscribe((resp: any) => {
        if(resp.Ok == true){
          this.iziToast.success({
            title: 'Correcto',
            message: resp.msg
          });
        } else {
          this.iziToast.success({
            title: 'Correcto',
            message: resp.msg
          });
        }
      })
    }
  }

}
 


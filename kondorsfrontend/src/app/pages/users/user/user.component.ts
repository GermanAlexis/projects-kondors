import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { ModiftyUserComponent } from '../modifty-user/modifty-user.component';
import { Ng2IzitoastService } from 'ng2-izitoast';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  
  data: any = []
  displayedColumns:  string[] = ['identification', 'name', 'date_bird', 'age', 'phone_number','action' ];
  dataSource = this.data;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  length = 0
  pageSize = 10
  pageIndex = 0

  constructor(private usersService: UsersService, public dialog:  MatDialog, public iziToast: Ng2IzitoastService) { 
    this.dataSource
  }
 

  ngOnInit(): void {
    this.getUsers()
  }

  countPages() {
    if(this.pageIndex == 0) {
      this.length = this.data.length
    } else {
      this.length = this.length - this.pageSize
    }
  }
  openDialog(uid: string) {
    const dialogRef = new MatDialogConfig()
    dialogRef.disableClose = true;
    dialogRef.autoFocus = true;
    dialogRef.width = '50%'
    dialogRef.data = {
      id: uid
    }
    this.dialog.open(ModiftyUserComponent, dialogRef)
  }

  getUsers(){
    this.usersService.get().subscribe((resp: any) => {
    
      if(resp.Ok == true ){
        this.data = resp.users
        this.countPages() 
        this.iziToast.success({
          title: 'Correcto'
        }); 
      }

    });
  }

  deleteUser(uid: string){
    this.usersService.deleteUser(uid).subscribe( (respdelete: any) => {
      if(respdelete.Ok == true){
        this.iziToast.success({
          title: 'Correcto',
          message: respdelete.msg
        });
        this.getUsers()  
      }
       
    })
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UsersService } from '../users.service';
import { ModiftyUserComponent } from '../modifty-user/modifty-user.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  
  
  data: any = []
  displayedColumns:  string[] = ['identification', 'name', 'date_bird', 'age', 'phone_number','action' ];
  dataSource = this.data;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; 

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  constructor(private usersService: UsersService, public dialog:  MatDialog) { 
    this.dataSource
  }
 

  ngOnInit(): void {
    this.getUsers()
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
    this.data = resp.users
    });
  }

  deleteUser(uid: string){
    this.usersService.deleteUser(uid).subscribe( respdelete => {
      this.getUsers()  
    })
  }

}

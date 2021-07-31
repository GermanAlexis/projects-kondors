import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvoiceComponent } from 'src/app/pages/invoices/invoice/invoice.component';
import { UsersService } from 'src/app/pages/users/users.service';

@Component({
  selector: 'app-sheared',
  templateUrl: './sheared.component.html',
  styleUrls: ['./sheared.component.css']
})
export class ShearedComponent implements OnInit {

  data: any = []
  value: any = '';
  constructor(   public dialogRef: MatDialogRef<ShearedComponent>,
                public dialog:  MatDialog,
                @Inject(MAT_DIALOG_DATA) data: any, private userService: UsersService, private router: Router) { this.data = data }

  ngOnInit(): void {
  }

  search(){
    if(this.value > 0 ){
      this.userService.getUserById(this.value).subscribe((resp: any) => {
        if(this.data.id == 'allinvoice' && resp.Ok == true){ 
            this.router.navigateByUrl(`/invoices`);
            this.dialogRef.close();
          } else if(this.data.id == '' && resp.Ok == true )
          {
              const dialogRef2 = new MatDialogConfig()
              dialogRef2.disableClose = false;
              dialogRef2.autoFocus = true;
              dialogRef2.width = '50%'
              dialogRef2.closeOnNavigation = true
              this.dialog.open( InvoiceComponent, dialogRef2)
              this.dialogRef.close();

            }
          
          })

          
    }
  }
}


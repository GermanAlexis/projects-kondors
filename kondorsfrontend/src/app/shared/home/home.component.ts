import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InvoiceComponent } from 'src/app/pages/invoices/invoice/invoice.component';
import { ModifyProductComponent } from 'src/app/pages/products/modify-product/modify-product.component';
import { ProductsComponent } from 'src/app/pages/products/product/products.component';
import { ModiftyUserComponent } from 'src/app/pages/users/modifty-user/modifty-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog:  MatDialog) { }

  ngOnInit(): void {
  }

  openDialogUser() {
    const dialogRef = new MatDialogConfig()
    dialogRef.disableClose = false;
    dialogRef.autoFocus = true;
    dialogRef.width = '50%'
   dialogRef.data = {
     id: ''
   }
    this.dialog.open(ModiftyUserComponent, dialogRef)
  }

  openDialogProduct() {
    const dialogRef = new MatDialogConfig()
    dialogRef.disableClose = false;
    dialogRef.autoFocus = true;
    dialogRef.width = '50%'
   dialogRef.data = {
     id: ''
   }
    this.dialog.open( ModifyProductComponent , dialogRef)
  }


  openDialoginvoice() {
    const dialogRef = new MatDialogConfig()
    dialogRef.disableClose = true;
    dialogRef.autoFocus = true;
    dialogRef.width = '50%'
    this.dialog.open( InvoiceComponent , dialogRef)
  }
}

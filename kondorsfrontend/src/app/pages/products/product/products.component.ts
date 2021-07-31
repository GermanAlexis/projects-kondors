import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ModifyProductComponent } from '../modify-product/modify-product.component';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
   
  data: any = []
  displayedColumns:  string[] = ['id_product' ,'name_product', 'inventory_quantity', 'price_sale', 'price_purchase','action' ];
  dataSource = this.data;
  length = 0
  pageSize = 10
  pageIndex = 0

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
 
  constructor(private productsService: ProductsService, public dialog:  MatDialog) {this.dataSource }

  ngOnInit(): void {
    this.getProducts()
   }

  openDialog(pid: string) {
    const dialogRef = new MatDialogConfig()
    dialogRef.disableClose = true;
    dialogRef.autoFocus = true;
    dialogRef.width = '50%'
    dialogRef.data = {
      id: pid
    }
    this.dialog.open(ModifyProductComponent, dialogRef)
  }

  getProducts(){
    this.productsService.getProducts().subscribe((resp: any) => {
    this.data = resp.products
    this.countPages()
    });
  }

  deleteUser(pid: string){
    this.productsService.deleteProduct(pid).subscribe( respdelete => {
      this.getProducts()  
    })
  }

  countPages() {
    if(this.pageIndex == 0) {
      this.length = this.data.length
    } else {
      this.length = this.length - this.pageSize
    }
  }
 
}

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
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; 

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
 
  constructor(private productsService: ProductsService, public dialog:  MatDialog) {this.dataSource }

  ngOnInit(): void {
    this.getProducts()
   }

  openDialog(pid: string) {
    console.log(pid);
    
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
    console.log(resp);
    
    });
  }

  deleteUser(pid: string){
    this.productsService.deleteProduct(pid).subscribe( respdelete => {
      this.getProducts()  
    })
  }
 
}

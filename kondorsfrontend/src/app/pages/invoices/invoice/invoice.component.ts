import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from '../../products/products.service';
import { InvoicesService } from '../invoices.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(private productsService: ProductsService, private invoicesService: InvoicesService ) { }

  formData!: FormGroup
  products! :any

  quantity_sold: number = 0;
  selectionOption: string = '';
  id_invoice: number = 0



  sale_product = [{ 
    product: '',
    quantity_sold: 0
  }]
  ngOnInit(): void {
    this.getProduct()
  }

  

  getProduct(){
    this.productsService.getProducts().subscribe( (resp: any ) => {
        this.products = resp.products
    })
  }

  
  operador() {
    if(this.quantity_sold > 0 && this.selectionOption != undefined) {
      this.products.forEach((element: any ) => {
         if (element.pid == this.selectionOption && element.inventory_quantity > this.quantity_sold ) {
          this.sale_product.push({ quantity_sold: this.quantity_sold, product: element.pid  })
          this.quantity_sold = 0;
          this.selectionOption = '';
        } 
      });
      
    }
  }

  saveInvoice() {

    let currentInvoice = {
      id_invoice: 12993548,
      user: '',
      products:[{
          product: '',
          quantity_sold: 0
      }]
    }

    currentInvoice.id_invoice = this.id_invoice
    // currentInvoice.user = ;
    currentInvoice.products = this.sale_product
    this.invoicesService.createInvoice(currentInvoice).subscribe( resp => {
        console.log(resp)
    })
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit {
  pid!: string

  formData!: FormGroup
  constructor(  @Inject(MAT_DIALOG_DATA) data: any, private fb: FormBuilder, private productsService: ProductsService) {  this.pid = data.id}

  ngOnInit(): void {
    this.pid == '' ? '' : this.getProduct()
    this.formData = this.fb.group({
      id_product: ['', Validators.required],
      name_product: ['', Validators.required],
      inventory_quantity: ['', Validators.required],
      price_sale: ['', Validators.required],
      price_purchase: ['', [Validators.required]]
    })
  
  }
  getProduct(){
    this.productsService.getIdProduct(this.pid).subscribe( (respGetid: any ) => {
      this.formData.controls['id_product'].setValue(respGetid.product.id_product)
      this.formData.controls['name_product'].setValue(respGetid.product.name_product)
      this.formData.controls['inventory_quantity'].setValue(respGetid.product.inventory_quantity)
      this.formData.controls['price_sale'].setValue(respGetid.product.price_sale)
      this.formData.controls['price_purchase'].setValue(respGetid.product.price_purchase)
    })
  }
  productInfo(){
    if(this.pid == ''){
      this.productsService.createProduct(this.formData.value).subscribe(resp => {
        console.log(resp)
      })
    } else {
      this.productsService.updateProduct(this.pid, this.formData).subscribe(resp => {
        console.log(resp)
      })
    }

  }

  deleteProduct(){
    this.productsService.deleteProduct(this.pid).subscribe( resp => {
      console.log(resp)
    })
  }
}

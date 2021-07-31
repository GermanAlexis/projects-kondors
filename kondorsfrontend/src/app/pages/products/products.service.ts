import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getIdProduct(pid: string){
    return this.http.get(`${base_url}/products/${pid}`)
  }

  getProducts(){
    return this.http.get(`${base_url}/products`)
  }

  createProduct(data: any){
    return this.http.post(`${base_url}/products`, data)
  }

  updateProduct(pid: string, data: any){
    return this.http.put(`${base_url}/products`, data)
  }

  deleteProduct(pid: string) {
    return this.http.delete(`${base_url}/products/${pid}`)
  }
}

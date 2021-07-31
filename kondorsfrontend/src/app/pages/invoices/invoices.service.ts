import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getInvoice(){
    return this.http.get(`${base_url}/invoices`)
  }

  createInvoice(data: any){
    return this.http.post(`${base_url}/invoices`, data)
  }

  filter(date: any) {
    return this.http.post(`${base_url}/invoices/filter`, date)

  }
}
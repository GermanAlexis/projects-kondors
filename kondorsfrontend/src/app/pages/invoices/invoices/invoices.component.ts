import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InvoicesService } from '../invoices.service';
import {DateAdapter} from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {


  data: any = []
  displayedColumns:  string[] = [
    'date_invoice',
    'id_invoice',
    'identification',
    'price_sale',
    'price_purchase',
    'total_sold',
  ]

  startDate!: string
  endDate!: string
  dataSource = this.data;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator; 

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }
  constructor( private invoicesService: InvoicesService ) { }

  ngOnInit(): void {
    this.getallInvoice()  
  }
  getallInvoice() {
    this.invoicesService.getInvoice().subscribe( (resp: any) => {
      this.data = resp.invoices
    })
  }

  getfilter(){
    let filterdate = {
      startDate: '',
      endDate: ''
    }

    filterdate.startDate = moment(this.startDate).format('YYYY/MM/DD')
    filterdate.endDate =  moment(this.endDate).format('YYYY/MM/DD')
      this.invoicesService.filter(filterdate).subscribe( (resp: any) => {
        if(resp.filter.length > 0){
          this.data = resp.filter
        }else {
          this.getallInvoice()
        }
      })
  }
}

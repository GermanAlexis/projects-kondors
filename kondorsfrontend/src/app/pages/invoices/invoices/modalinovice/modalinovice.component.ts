import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-modalinovice',
  templateUrl: './modalinovice.component.html',
  styleUrls: ['./modalinovice.component.css']
})
export class ModalinoviceComponent implements OnInit {

  data: any = []
  displayedColumns:  string[] = ['id_invoice', 'name_product', 'quantity_sold'];
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;
  length = 0 
  pageSize = 10;
  pageIndex = 0
                                                                 ; 
  constructor(@Inject(MAT_DIALOG_DATA) data: any) { this.data = data[0] }
  ngOnInit(): void {
     this.countPages()
  }

  countPages() {
    if(this.pageIndex == 0) {
      this.length = this.data.length
    } else {
      this.length = this.length - this.pageSize
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { SaleService } from './sale.service';

@Component({
  selector: 'app-saleoff',
  templateUrl: './saleoff.component.html',
  styleUrls: ['./saleoff.component.css']
})
export class SaleoffComponent implements OnInit {


  listItem: any;
  page = 1;
  count = 0;
  tableSize = 5;
  tableSizes = [3, 6, 9, 12];

  constructor(private saleservice: SaleService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.saleservice.getAll()
      .subscribe(
        response => {
          this.listItem = response;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  onTableDataChange(event){
    this.page = event;
    this.fetchPosts();
  }

  onTableSizeChange(event): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchPosts();
  }
}

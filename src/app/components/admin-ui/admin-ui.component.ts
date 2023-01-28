import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.scss'],
})
export class AdminUIComponent {
  @ViewChild('name') name: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('role') role: ElementRef;

  currentPage: number = 1;
  itemsPerPage = 10;
  selectAll = false;

  searchText = '';

  data: any = [];
  constructor(public api: ApiService) {
    this.api
      .getData()
      .pipe(
        catchError((error) => {
          // Handle the error
          alert(error.message);
          return throwError(error);
        })
      )
      .subscribe((data) => {
        this.data = data;
      });
  }

  next() {
    let lastPage = Math.ceil(this.data.length / this.itemsPerPage);
    return lastPage;
  }

  selectAllItem() {
    this.data
      .filter((item, index) => {
        const start = (this.currentPage - 1) * 10;
        const end = start + 10;
        return index >= start && index < end;
      })
      .forEach((item) => (item.selected = this.selectAll));
  }

  deleteOne(index) {
    this.data.splice(index, 1);
  }

  deleteSelected() {
    this.data = this.data.filter((item) => !item.selected);
    this.selectAll = false;
  }

  edit(item) {
    this.data.forEach((item) => {
      item.editing = false;
    });

    item.editing = true;

    console.log(item.editing);
  }

  saveEdit(item) {
    item.editing = !item.editing;
    item.name = this.name.nativeElement.value;
    item.email = this.email.nativeElement.value;
    item.role = this.role.nativeElement.value;
  }

  cancel(item) {
    item.editing = !item.editing;
  }

  resetSelectAll() {
    this.selectAll = false;
    this.data
      .filter((item, index) => {
        const start = (this.currentPage - 1) * 10;
        const end = start + 10;
        return index >= start && index < end;
      })
      .forEach((item) => (item.selected = this.selectAll));
  }

  goToLastPage() {
    this.currentPage = Math.ceil(this.data.length / 10);
  }

  goToFirstPage() {
    this.currentPage = 1;
  }
}

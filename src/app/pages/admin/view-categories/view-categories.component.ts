import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories: any[] = [];

  constructor(private _category: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error !!", "Error in loading data", 'error');
      }
    );
  }

  deleteCategory(category: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(category.cid).subscribe(
          () => {
            this.categories = this.categories.filter(c => c.cid !== category.cid);
            Swal.fire(
              'Deleted!',
              'The category has been deleted.',
              'success'
            );
          },
          (error) => {
            console.log(error);
            Swal.fire("Error !!", "Error in deleting category", 'error');
          }
        );
      }
    });
  }
}

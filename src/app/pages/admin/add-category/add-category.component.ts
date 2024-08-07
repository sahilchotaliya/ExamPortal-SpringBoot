import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: ''
  };

  @ViewChild('categoryForm') categoryForm!: NgForm;

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() === '' || this.category.title == null) {
      Swal.fire('Error !', 'Title is required', 'error');
      return;
    }

    // Call server
    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        this.resetForm(this.categoryForm);
        Swal.fire('Success !', 'Category added successfully', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Server error', 'error');
      }
    );
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.category = {
      title: '',
      description: ''
    };
  }
}

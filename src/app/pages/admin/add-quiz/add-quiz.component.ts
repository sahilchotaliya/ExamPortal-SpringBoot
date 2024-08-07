import { CategoryService } from './../../../services/category.service';
import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
 // Assuming you have this service
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories: any[] = [];
  quizData: any = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cid: ''
    }
  };

  constructor(
    private QuizService: QuizService,
    private CategoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.CategoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error loading categories:', error);
        Swal.fire('Error', 'Error in loading categories', 'error');
      }
    );
  }

  addQuiz() {
    if (this.quizData.title.trim() === '' || this.quizData.category.cid === '') {
      Swal.fire('Error', 'Title and Category are required', 'error');
      return;
    }

    this.QuizService.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'Quiz added successfully', 'success');
        this.router.navigate(['/admin/quizzes']);
      },
      (error) => {
        console.error('Error adding quiz:', error);
        Swal.fire('Error', 'Error in adding quiz', 'error');
      }
    );
  }
}

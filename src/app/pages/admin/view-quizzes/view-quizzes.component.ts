import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any[] = [];
  nonPublishedQuizzes: any[] = [];

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes() {
    this.quizService.quizzes().subscribe(
      (data: any) => {
        // Separate quizzes into published and non-published
        this.quizzes = data.filter((quiz: any) => quiz.active);
        this.nonPublishedQuizzes = data.filter((quiz: any) => !quiz.active);
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
        Swal.fire('Error', 'Error in loading quizzes', 'error');
      }
    );
  }

  viewQuestions(quizId: number) {
    this.router.navigate(['/admin/view-questions', quizId]);
  }

  updateQuiz(quizId: number) {
    this.router.navigate(['/admin/update-quiz', quizId]);
  }

  viewAttempts(quizId: number) {
    this.router.navigate(['/admin/quiz-attempts', quizId]);
  }

  deleteQuiz(qid:any) {
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
        this.quizService.deleteQuiz(qid).subscribe(
          (data) => {
            Swal.fire('Deleted!', 'Quiz has been deleted.', 'success');
            this.loadQuizzes(); // Reload quizzes after deletion
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }

  addNewQuiz() {
    this.router.navigate(['/admin/add-quiz']);
  }
}

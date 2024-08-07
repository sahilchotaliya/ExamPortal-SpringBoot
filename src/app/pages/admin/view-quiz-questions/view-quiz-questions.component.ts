import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qid: any;
  qtitle: any;
  questions: any[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.paramMap.get('qid');
    this.qtitle = this._route.snapshot.paramMap.get('qtitle');
    this.loadQuestions();
  }

  loadQuestions() {
    this._question.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQuestion(quesId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this question!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(quesId).subscribe(
          (data) => {
            this.questions = this.questions.filter(q => q.quesId !== quesId);
            Swal.fire('Deleted!', 'The question has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Failed to delete the question.', 'error');
          }
        );
      }
    });
  }
}

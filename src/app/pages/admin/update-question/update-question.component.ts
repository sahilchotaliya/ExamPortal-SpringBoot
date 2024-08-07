import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesId: number | undefined;
  question: any = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: { qid: null, title: '' }  // Add this to store quiz information
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.quesId = +this._route.snapshot.paramMap.get('qid')!;
    this.loadQuestion();
  }

  loadQuestion() {
    if (this.quesId) {
      this._question.getQuestion(this.quesId).subscribe(
        (data: any) => {
          this.question = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  public formSubmit() {
    if (this.quesId) {
      this._question.updateQuestion(this.quesId, this.question).subscribe(
        (data) => {
          Swal.fire('Success', 'Question updated successfully', 'success').then(() => {
            // Navigate to the view-questions page with quiz ID and title
            if (this.question.quiz && this.question.quiz.qid) {
              this._router.navigate(['/admin/view-questions', this.question.quiz.qid, this.question.quiz.title]);
            } else {
              // If quiz information is not available, navigate to a default page
              this._router.navigate(['/admin/quizzes']);
            }
          });
        },
        (error) => {
          Swal.fire('Error', 'Error updating question', 'error');
        }
      );
    }
  }
}

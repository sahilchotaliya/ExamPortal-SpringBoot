import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface Question {
  quiz: { qid?: number };
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;  // Correctly assign ClassicEditor
  public editorConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']
  };

  qId: any;
  qTitle: string | undefined;

  question: Question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.qId = +this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['qtitle'];
    this.question.quiz = { qid: this.qId };
  }

  formSubmit() {
    if (
      this.question.content.trim() === '' ||
      this.question.option1.trim() === '' ||
      this.question.option2.trim() === '' ||
      this.question.answer.trim() === ''
    ) {
      Swal.fire('Error', 'Please fill in all required fields', 'error');
      return;
    }

    if (![this.question.option1, this.question.option2, this.question.option3, this.question.option4].includes(this.question.answer)) {
      Swal.fire('Error', 'The correct answer must match one of the options', 'error');
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question Added. Add Another one', 'success');
        this.resetForm();
      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }

  resetForm() {
    this.question = {
      quiz: { qid: this.qId },
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: ''
    };
  }
}

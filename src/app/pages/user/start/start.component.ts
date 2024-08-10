import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {
  qid: any;
  questions: any[] = [];
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;
  time = 0;
  currentQuestionIndex = 0;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  loadQuestions(): void {
    this._question.getQuestionsOfQuizTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.questions.forEach((q) => {
          q.givenAnswer = '';
          q.correct = '';
        });
        this.time = this.questions.length * 60;
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading questions', 'error');
      }
    );
  }

  startTimer() {
    this.timer = setInterval(() => {
      if (this.time <= 0) {
        this.submitQuiz();
      } else {
        this.time--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let mm = Math.floor(this.time / 60);
    let ss = this.time - mm * 60;
    return `${mm}:${ss < 10 ? '0' : ''}${ss}`;
  }

  submitQuiz(): void {
    Swal.fire({
      title: 'Submit Quiz?',
      text: 'Are you sure you want to submit the quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmit = true;
        this.calculateResults();
        clearInterval(this.timer);
      }
    });
  }

  calculateResults(): void {
    this.questions.forEach((q) => {
      if (q.givenAnswer) {
        this.attempted++;
        if (q.givenAnswer === q.answer) {
          this.correctAnswers++;
          this.marksGot += q.quiz.maxMarks / this.questions.length;
          q.correct = 'correct';
        } else {
          q.correct = 'incorrect';
        }
      }
    });
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

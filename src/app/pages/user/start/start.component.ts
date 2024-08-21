import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { QuizService } from '../../../services/quiz.service';
import { UserProfileService } from '../../../services/user-profile.service';
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
  showInstructions = true;
  isFullscreen = false;

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: any) {
    event.preventDefault();
    this.blockTabSwitch();
  }

  @HostListener('document:fullscreenchange', ['$event'])
  onFullscreenChange(event: any) {
    this.isFullscreen = !!document.fullscreenElement;
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {
    event.preventDefault();
  }

  @HostListener('document:copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.preventDefault();
    Swal.fire('Error', 'Copying text is not allowed during the quiz.', 'error');
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _question: QuestionService,
    private _quiz: QuizService
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions();
  }

  blockTabSwitch(): void {
    Swal.fire({
      title: 'Stop!',
      text: 'Switching tabs or windows is not allowed during the quiz.',
      icon: 'warning',
      confirmButtonText: 'Understood'
    }).then(() => {
      this.enterFullscreen();
    });
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
        this.enterFullscreen();
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
    clearInterval(this.timer);
    this.calculateResults();

    this._quiz.submitQuiz(this.qid, this.marksGot).subscribe(
      (data: any) => {
        console.log(data);
        this.isSubmit = true;
        Swal.fire('Success', 'Quiz submitted successfully', 'success');
      },
      (error) => {
        console.error('Error submitting quiz:', error);
        Swal.fire('Error', 'Failed to submit quiz', 'error');
      }
    );
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
    this.exitFullscreen();
  }

  startQuiz() {
    this.showInstructions = false;
    this.enterFullscreen();
    this.loadQuestions();
  }

  enterFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  }

  exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

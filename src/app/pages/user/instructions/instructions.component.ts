import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid: any;
  quiz: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.quizService.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        alert('Error in loading quiz data');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Are you sure you want to start the quiz?',
      text: 'Once started, you cannot go back.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Start',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start', this.qid]);
      }
    });
  }
}

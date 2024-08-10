import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadquizserviceService } from '../../../services/loadquizservice.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  quizzes: any[] = [];
  categoryId: number | null = null;

  constructor(
    private loadquizService: LoadquizserviceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'] ? +params['categoryId'] : null;
      this.loadActiveQuizzes();
    });
  }

  loadActiveQuizzes() {
    if (this.categoryId) {
      this.loadquizService.getActiveQuizzesByCategory(this.categoryId).subscribe(
        (data: any) => {
          this.quizzes = data;
        },
        (error) => {
          console.error('Error fetching active quizzes:', error);
        }
      );
    } else {
      this.loadquizService.getAllActiveQuizzes().subscribe(
        (data: any) => {
          this.quizzes = data;
        },
        (error) => {
          console.error('Error fetching active quizzes:', error);
        }
      );
    }
  }
}

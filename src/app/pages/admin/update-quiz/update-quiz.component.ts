import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit
{
  categories: any[] = [];
  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private CategoryService: CategoryService,private _router : Router){}

  qId = 0;
  quiz:any;


ngOnInit(): void {
  this.loadCategories();
  this.qId = +this._route.snapshot.params['qid']; // Use bracket notation here


  this._quiz.getQuiz(this.qId).subscribe(

  (data:any)=>{
  this.quiz=data
    console.log(this.quiz);

},(error)=>{
  console.log(error)
}

  )


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

// update data

public updateData(){
  this._quiz.updateQuiz(this.quiz).subscribe(
    (data)=>{
      Swal.fire('Success !!','quiz updated' , 'success').then((e)=>{
        this._router.navigate(['/admin/quizzes'])
      });

    },
    (error)=>{
      Swal.fire('Error' , 'error  in updateing quiz', 'error');
      console.log(error);
    }
  );
}

}

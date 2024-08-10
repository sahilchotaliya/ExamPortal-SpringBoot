// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  userQuizzes: any[] = [];
  totalQuizzes = 0;
  totalMarksEarned = 0;
  averageScore = 0;
  displayedColumns: string[] = ['quizTitle', 'date', 'marks'];

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserQuizzes();
  }

  loadUserProfile(): void {
    this.userProfileService.getUserProfile().subscribe(
      (data) => {
        this.userProfile = data.user;
        this.totalQuizzes = data.totalQuizzesTaken;
        this.totalMarksEarned = data.totalMarksEarned;
        this.averageScore = data.averageScore;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadUserQuizzes(): void {
    this.userProfileService.getUserQuizzes().subscribe(
      (data) => {
        this.userQuizzes = data;
        console.log(this.userQuizzes)
      },
      (error) => {
        console.error('Error fetching user quizzes:', error);
      }
    );
  }
}

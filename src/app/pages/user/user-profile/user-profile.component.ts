import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserProfileService } from '../../../services/user-profile.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  userProfile: any;
  userQuizzes: any[] = [];
  userQuizzesPageable: any[] = [];
  totalQuizzes = 0;
  totalMarksEarned = 0;
  averageScore = 0;
  displayedColumns: string[] = ['quizTitle', 'date', 'marks'];
  pageSize = 10;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadUserQuizzes();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.userQuizzes.length;
    }
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
        this.userQuizzes = data.reverse();
        this.updatePageableData(0);
      },
      (error) => {
        console.error('Error fetching user quizzes:', error);
      }
    );
  }

  updatePageableData(pageIndex: number) {
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.userQuizzesPageable = this.userQuizzes.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.updatePageableData(event.pageIndex);
  }

  generateQuizResultPdf(quiz: any): void {
    const doc = new jsPDF('p', 'mm', 'a4');

    // Add user profile image
    const profileImageUrl = 'assets/profile-image.png'; // Replace with your profile image URL
    try {
      doc.addImage(profileImageUrl, 'PNG', 20, 20, 50, 50);
    } catch (error) {
      console.error('Error adding profile image to PDF:', error);
    }

    // Add user profile information
    doc.setFontSize(18);
    doc.text(`${this.userProfile.username}`, 80, 35);
    doc.setFontSize(14);
    doc.text(`${this.userProfile.email}`, 80, 45);

    // Add quiz information
    doc.setFontSize(16);
    doc.text(`Quiz Result`, 20, 80);
    doc.setFontSize(14);
    doc.text(`Quiz Title: ${quiz.quiz.title}`, 20, 90);
    doc.text(`Date & Time: ${quiz.attemptDate}`, 20, 100);
    doc.text(`Marks Earned: ${quiz.marksEarned} / ${quiz.quiz.maxMarks}`, 20, 110);

    autoTable(doc, {
      head: [['Question', 'Marks']],
      body: quiz.quiz.questions.map((question: any) => [question.title, question.marks]),
      startY: 120
    });

    doc.save(`${quiz.quiz.title}_result.pdf`);
  }

  generateOverallPerformancePdf(): void {
    const doc = new jsPDF('p', 'mm', 'a4');


    const profileImageUrl = 'assets/result.png';
    try {
      doc.addImage(profileImageUrl, 'PNG', 20, 20, 50, 50);
    } catch (error) {
      console.error('Error adding profile image to PDF:', error);
    }


    doc.setFontSize(18);
    doc.text(`${this.userProfile.username}`, 80, 35);
    doc.setFontSize(14);
    doc.text(`${this.userProfile.email}`, 80, 45);


    doc.setFontSize(16);
    doc.text('Overall Performance', 20, 80);
    doc.setFontSize(14);
    doc.text(`Total Quizzes: ${this.totalQuizzes}`, 20, 90);
    doc.text(`Total Marks Earned: ${this.totalMarksEarned}`, 20, 100);
    doc.text(`Average Score: ${this.averageScore}%`, 20, 110);

    doc.save('overall_performance.pdf');
  }
}

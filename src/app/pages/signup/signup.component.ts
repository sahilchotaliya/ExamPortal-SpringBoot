import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    firstname: '',
    password: '',
    lastname: '',
    email: '',
    number: ''
  };

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router) {} // Inject Router

  ngOnInit(): void {
    // Initialization logic if needed
  }

  formSubmit(): void {
    if (!this.user.username || !this.user.password || !this.user.email || !this.user.firstname || !this.user.lastname || !this.user.number) {
      this.snackBar.open('All fields are required!', 'OK', { duration: 3000 });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Success', `Username ${data.username} is Registered`, 'success').then(() => {
          this.router.navigate(['/login']); // Redirect to login page
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Registration failed. Please try again.', 'OK', { duration: 3000 });
      }
    );
  }
}

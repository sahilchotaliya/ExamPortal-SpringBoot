import { Component, OnInit } from '@angular/core';
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
    phone: ''
  };

  constructor(private userService: UserService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Initialization logic if needed
  }

  formSubmit(): void {
    if (!this.user.username) {
      this.snackBar.open('Username is required!', 'OK', { duration: 3000 });
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log(data);
        Swal.fire('Sucess','Username'+` `+data.username+` `+`is Registered`+`  `,'success');
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Registration failed. Please try again.', 'OK', { duration: 3000 });
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginData={
    username:'',
    password:'',
  };

  constructor( private snackBar: MatSnackBar,private login:LoginService,private router:Router

  ) {}

  ngOnInit(): void {}

  formSubmit(){
    console.log("login Button Cliked");

    if(this.loginData.username.trim()=='' || this.loginData.username == null)
    {
      this.snackBar.open('Username is required!', 'OK', { duration: 3000 });
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password == null)
      {
        this.snackBar.open('password is required!', 'OK', { duration: 3000 });
        return;
      }

      //request to server to generate token

      this.login.generateToken(this.loginData).subscribe(

        (data:any)=>{
          console.log("Sucess Token ");
          console.log(data);


          this.login.loginUser(data.token);
          this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user);
              console.log(user);

              //rediret current user
              //redirect admin user

              if(this.login.getUSerRole()=="ADMIN"){
               // window.location.href='/admin'

                this.router.navigate(['admin'])
                this.login.loginStatusSubject.next(true);
              }else if(this.login.getUSerRole()=="NORMAL"){
                this.router.navigate(['user-dashboard'])
                this.login.loginStatusSubject.next(true);
             //   window.location.href='/user-dashboard'
              }else{
                this.login.logout();

              }
            }
          );
        },
        (error)=>
        {
          console.log("error !");
          console.log(error);
          this.snackBar.open('Invaid Details !! Try again ', '' ,{
            duration:3000,
          })
        }
      );

  }
}

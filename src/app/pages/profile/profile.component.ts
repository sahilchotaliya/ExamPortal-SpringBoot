import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any = {};  // Initialize user with an empty object

  constructor(private login: LoginService) {}

  ngOnInit(): void {

    this.user = this.login.getUser();  // Fetch user details on component initialization

    // this.login.getCurrentUser().subscribe(
    //   (user:any)=>{
    //     this.user=user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // )
  }

}

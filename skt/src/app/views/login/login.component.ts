import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/Users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  model: any = {};
  getData!: any;
  users: Users[] = [];

  constructor(private userService: UsersService,
    private router: Router) {}

  ngOnInit(): void {
  }

  loginUser()
  {
    var user=this.model.username;
    var password=this.model.password;
    console.log(this.model);
    this.userService.getUserData(user,password).subscribe(
      (res:any) =>{
        this.getData=res;
        console.log("flag "+this.getData)

        if(this.getData != -1)
        {

    this.router.navigate(['/home']);
        }else {
          alert("Invalid Users");
        }
      }
    );
}
}

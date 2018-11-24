import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password: string;


  constructor(private fire: AngularFireAuth, private router: Router , private toaster: ToastrService) { }

  ngOnInit() {
  }

  login() {
    this.fire.auth.signInWithEmailAndPassword(this.email, this.password).then(()=>{
      this.router.navigate(['/home']);
    }).catch(()=>{
      this.toaster.error('Wrong email or password', 'Log in');
    });
  }

}

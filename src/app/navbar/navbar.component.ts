import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  public isLoggedIn: boolean = false;

  constructor(public fireAuth: AngularFireAuth, private routing: Router) {
    this.user = fireAuth.authState;

    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this.routing.navigate(['/home']);
      }
    });
   }

  ngOnInit() {
    $(function() {
      $(window).scroll(function() {
        $('nav').addClass('fixed-top');
      })
    })
  }

  logout() {
    this.fireAuth.auth.signOut();
    this.isLoggedIn = false;
  }

}

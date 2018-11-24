import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
    $(function(){
      $('#Container').mixItUp();
      $('.port-grid .filter').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active')
      })
    });
  }

}

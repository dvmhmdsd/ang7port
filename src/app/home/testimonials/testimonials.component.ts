import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { Testimonials } from '../../shared/testimonials.model';

declare var $:any;

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  list: Testimonials[];

  constructor(private service: DataService) { }

  ngOnInit() {

    this.service.getTestitData().subscribe(action => {
      this.list = action.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Testimonials
      })
    });
  }

}

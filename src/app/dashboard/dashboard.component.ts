import { Contact } from './../shared/data.model';
import { Testimonials } from './../shared/testimonials.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from './../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  list: Testimonials[];
  list2: Contact[];

  constructor(private service: DataService, private store: AngularFirestore, private toaster: ToastrService) { }

  ngOnInit() {
    this.service.getTestitData().subscribe(action => {
      this.list = action.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Testimonials
      })
    });

    this.service.getContactData().subscribe(action => {
      this.list2 = action.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Contact
      })
    });


    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if (form != null) form.resetForm();
    
    this.service.testimonial = {
      id: null,
      name: '',
      job: '',
      preview: ''
    }

  }

  testiSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);

    delete data.id;

    if (form.value.id == null) {
      this.store.collection('testimonials').add(data);
      this.toaster.success('Submitted successfully', 'Feedback');
    } else {
      this.store.doc('testimonials/' + form.value.id).update(data);
      this.toaster.success('Updated successfully', 'Feedback');
    }

    this.resetForm(form);
  }

  onEdit(item: Testimonials) {
    this.service.testimonial = Object.assign({}, item);
    this.toaster.success('Updated successfully', 'Feedback');
  }

  onDelete(id) {
    if (confirm('Are you sure?')) {
      this.store.doc('testimonials/' + id).delete();
      this.toaster.error('Deleted successfully', 'Feedback')
    }
  }

  

}

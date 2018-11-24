import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private service: DataService, public store: AngularFirestore, private toaster: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?:NgForm) {
    if (form != null) form.resetForm();
    
    this.service.formData = {
      id: null,
      name: '',
      email: '',
      message: ''
    }

  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);

    delete data.id;

    if (form.value.id == null) {
      this.store.collection('contact').add(data);
      this.toaster.success('Submitted successfully', 'Message');
    } else {
      this.store.doc('contact/' + form.value.id).update(data);
      this.toaster.success('Ubdated successfully', 'Message');
    }

    this.resetForm(form);
  }

}

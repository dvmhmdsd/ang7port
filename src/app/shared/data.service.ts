import { AngularFirestore } from '@angular/fire/firestore';
import { Testimonials } from './testimonials.model';
import { Contact } from './data.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  formData: Contact;

  testimonial: Testimonials;

  constructor(private store: AngularFirestore) { }

  getContactData () {
    return this.store.collection('contact').snapshotChanges();
  }

  getTestitData() {
    return this.store.collection('testimonials').snapshotChanges();
  }

}

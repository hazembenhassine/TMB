import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TbmService } from '../../services/tbm.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  today = moment();
  currentlyBusy = false;

  sizes: string[] = ['S', 'M', 'L', 'XL'];

  subscriptionForm: FormGroup = this.fb.group({
    first_name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(2)]],
    nickname: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3)]],
    cin: ['', [Validators.required]],
    nationality: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', [Validators.required, Validators.minLength(6)]],
    birthdate: ['', Validators.required],
    club: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(2)]],
    emergency_contact: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(2)]],
    emergency_contact_num: ['', [Validators.required, Validators.minLength(6)]],
    gender: [0, Validators.required],
    t_shirt: ['S', Validators.required],
    creation_date: [moment().format('YYYY-MM-DD') + 'T23:13:48.024Z'],
    rules_and_agreements: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder,
              private datePipe: DatePipe,
              private api: TbmService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  getCurrentSize() {
    return this.subscriptionForm.get('t_shirt').value;
  }

  setCurrentSize(size: string) {
    this.subscriptionForm.patchValue({t_shirt: size});
  }

  getSex() {
    return this.subscriptionForm.get('gender').value;
  }

  setSex(sex: number) {
    return this.subscriptionForm.patchValue({gender: sex});
  }

  isFieldInvalid(field: string) {
    return this.subscriptionForm.get(field).invalid && (this.subscriptionForm.get(field).dirty || this.subscriptionForm.get(field).touched);
  }

  submitForm() {
    if (this.subscriptionForm.valid) {
      const body = Object.assign({}, this.subscriptionForm.value);
      this.subscriptionForm.disable();
      this.currentlyBusy = true;
      body.birthdate = this.datePipe.transform(body.birthdate, 'dd/MM/yyyy');
      delete body.rules_and_agreements;
      this.api.submitSubscriptionForm(body).then(() => {
        this.toastr.success('Vous avez été inscrit avec succès!', 'Succès!', {timeOut: 10000, closeButton: true});
        this.subscriptionForm.reset();
        window.open('https://www.teskerti.tn/evenement/trail-mont-bougarnine-2020/', '_self');
      }).catch(() => {
        this.toastr.error('Une erreur s\'est produite, veuillez réessayer plus tard.', 'Erreur!', {timeOut: 10000, closeButton: true});
      }).finally(() => {
          this.subscriptionForm.enable();
          this.currentlyBusy = false;
        }
      );
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TbmService} from '../../services/tbm.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-volunteer-subscription',
  templateUrl: './volunteer-subscription.component.html',
  styleUrls: ['./volunteer-subscription.component.scss']
})
export class VolunteerSubscriptionComponent implements OnInit {

  volunteerForm: FormGroup = this.fb.group({
    first_name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(6)]],
    message: [''],
    rules_and_agreements: [false, Validators.requiredTrue]
  });

  currentlyBusy = false;

  constructor(private dialogRef: MatDialogRef<VolunteerSubscriptionComponent>,
              private fb: FormBuilder,
              private api: TbmService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isFieldInvalid(field: string) {
    return this.volunteerForm.get(field).invalid && (this.volunteerForm.get(field).dirty || this.volunteerForm.get(field).touched);
  }

  submitForm() {
    if (this.volunteerForm.valid) {
      const body = Object.assign({}, this.volunteerForm.value);
      this.volunteerForm.disable();
      this.currentlyBusy = true;
      delete body.rules_and_agreements;
      body.phone = body.phone.toString();
      this.api.submitVolunteerForm(body).then(() => {
        this.toastr.success('Vous avez été inscrit avec succès!', 'Succès!', {timeOut: 10000, closeButton: true});
        this.volunteerForm.reset();
        this.dialogRef.close();
      }).catch(() => {
        this.toastr.error('Une erreur s\'est produite, veuillez essayer plus tard.', 'Erreur!', {timeOut: 10000, closeButton: true});
      }).finally(() => {
          this.volunteerForm.enable();
          this.currentlyBusy = false;
        }
      );
    }
  }

}

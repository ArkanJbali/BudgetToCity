import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatStepper, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper'

@Component({
  selector: 'app-budget-reservation',
  templateUrl: './budget-reservation.component.html',
  styleUrls: ['./budget-reservation.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class BudgetReservationComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<BudgetReservationComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('Inside dialog: ', this.data);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  onClose() {
      this.dialogRef.close();
  }
}

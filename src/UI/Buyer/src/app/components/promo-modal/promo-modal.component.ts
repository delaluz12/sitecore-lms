import { Component, OnInit, Inject } from '@angular/core'
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './promo-modal.component.html',
})
export class PromoModalComponent {
  message =
    '<strong>Sitecore Summer Savings:</strong> Don’t miss this chance to certify your skills with our <strong>20%</strong> promotion on all Sitecore certification exams all summer long! Use promo code <strong>CERTIFY20</strong> at checkout.<br> <em>Valid from July 1st through September 30th, 2024.</em>'
  cancelButtonText = 'Close'

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PromoModalComponent>
  ) {
    if (data) {
      this.message = data.message || this.message
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true)
  }

  closeModal(): void {
    this.dialogRef.close()
  }
}

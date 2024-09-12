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
    '<strong>Unlock 25% Off Virtual Instructor-Led Training!</strong><br> Boost your skills from anywhere with our expert-led sessions. Use code <strong>LEARN25</strong> at checkout and save 25% on any of our Virtual Instructor-led Training, now through December 31, 2024.'
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

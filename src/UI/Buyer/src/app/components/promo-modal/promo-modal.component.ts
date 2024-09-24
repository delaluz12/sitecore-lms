import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './promo-modal.component.html',
})
export class PromoModalComponent {
  message: string
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

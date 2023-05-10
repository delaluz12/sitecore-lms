import { Component, ViewChild } from '@angular/core'
import { groupBy as _groupBy } from 'lodash'
import { NgxSpinnerService } from 'ngx-spinner'
import { Address } from 'ordercloud-javascript-sdk'
import { CheckoutService } from 'src/app/services/order/checkout.service'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'
import { OCMParentTableComponent } from './parent-table-component'
import { NgbAccordion, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap'

@Component({
  templateUrl: './lineitem-table.component.html',
  styleUrls: ['./lineitem-table.component.scss'],
})
export class OCMLineitemTable extends OCMParentTableComponent {
  @ViewChild('acc', { static: false }) public accordian: NgbAccordion
  beforeChange($event: NgbPanelChangeEvent): void {
    return $event.preventDefault()
  }
  constructor(
    context: ShopperContextService,
    spinner: NgxSpinnerService,
    checkoutService: CheckoutService
  ) {
    super(context, spinner, checkoutService)
  }
}

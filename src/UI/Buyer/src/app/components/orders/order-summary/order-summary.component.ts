import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { OrderSummaryMeta } from 'src/app/models/order.types'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'

@Component({
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OCMOrderSummary implements OnInit, OnChanges {
  @Input() orderSummaryMeta: OrderSummaryMeta
  @Input() currentPanel: string
  _orderSummaryMeta: OrderSummaryMeta
  _orderCurrency: string
  isPartner = false
  constructor(private context: ShopperContextService) {}

  ngOnInit(): void {
    this._orderCurrency = this.context.currentUser.get().Currency
    this.context.currentUser.onChange((user) => {
      if (
        user.UserGroups.findIndex((group) =>
          group.Name.toLowerCase().includes('partner')
        ) !== -1
      ) {
        this.isPartner = true
      }
    })
  }

  ngOnChanges(): void {
    this._orderSummaryMeta = this.orderSummaryMeta
  }
}

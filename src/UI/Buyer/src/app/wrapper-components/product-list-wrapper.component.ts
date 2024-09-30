import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ShopperContextService } from '../services/shopper-context/shopper-context.service'
import { takeWhile } from 'rxjs/operators'
import { ListPage } from 'ordercloud-javascript-sdk'
import { isEmpty as _isEmpty, uniq as _uniq } from 'lodash'
import { SupplierFilterService } from '../services/supplier-filter/supplier-filter.service'
import { HeadStartSDK, HSMeProduct } from '@ordercloud/headstart-sdk'
import { ShipFromSourcesDic } from '../models/shipping.types'
import { PromoModalComponent } from '../components/promo-modal/promo-modal.component'
import { MatDialog } from '@angular/material/dialog'
import { HSPromotion } from '@ordercloud/headstart-sdk/dist/models/HSPromotion'

@Component({
  template: `
    <ocm-promo-banner
      *ngIf="showCustModal"
      [message]="promoMessage"
    ></ocm-promo-banner>
    <ocm-product-list
      *ngIf="products"
      [products]="products"
      [shipFromSources]="shipFromSources"
      [isProductListLoading]="isProductListLoading"
    ></ocm-product-list>
  `,
})
export class ProductListWrapperComponent implements OnInit, OnDestroy {
  products: ListPage<HSMeProduct>
  shipFromSources: ShipFromSourcesDic = {}
  alive = true
  isProductListLoading = true
  showCustModal
  eligiblePromos: HSPromotion[]
  promoMessage = ''

  constructor(
    public context: ShopperContextService,
    private supplierFilterService: SupplierFilterService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    if (_isEmpty(this.activatedRoute.snapshot.queryParams)) {
      this.context.categories.setActiveCategoryID(null)
    }
    this.context.productFilters.activeFiltersSubject
      .pipe(takeWhile(() => this.alive))
      .subscribe(this.handleFiltersChange)

    await this.displayPromo()

    const shownModal = sessionStorage.getItem('modalShown')

    if (!shownModal && this.showCustModal) {
      this.openAlertDialog()
      sessionStorage.setItem('modalShown', 'true')
    }
  }

  private async displayPromo(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.eligiblePromos = await HeadStartSDK.Mes.GetPromoContent()
    if (this.eligiblePromos.length > 0) {
      // currently User can only see banner/modal for 1 promotion i.e. if there are 2 available only the first will display
      const promoToDisplay = this.eligiblePromos.find((_) => _)
      this.promoMessage = promoToDisplay.xp?.PromoContent
      this.showCustModal = true
    }
  }

  ngOnDestroy(): void {
    this.alive = false
  }

  openAlertDialog(): void {
    const dialogRef = this.dialog.open(PromoModalComponent, {
      height: 'auto',
      width: 'auto',
      data: {
        message: this.promoMessage,
      },
    })
  }

  private handleFiltersChange = async (): Promise<void> => {
    this.isProductListLoading = true
    const user = this.context.currentUser.get()
    const userGroups = user?.UserGroups?.length
    if (!userGroups) {
      throw new Error(
        'User is not configured - must be assigned to at least one location group'
      )
    }
    try {
      this.products = await this.context.productFilters.listProducts()
      const sourceIds = {}
      // gather supplier IDs and unique shipFromAddress IDs per supplier
      this.products.Items.forEach((p) => {
        if (!p.DefaultSupplierID || !p.ShipFromAddressID) return
        const source = sourceIds[p.DefaultSupplierID]
        if (!source) {
          sourceIds[p.DefaultSupplierID] = [p.ShipFromAddressID]
        } else {
          sourceIds[p.DefaultSupplierID] = _uniq([
            ...source,
            p.ShipFromAddressID,
          ])
        }
      })
      Object.keys(sourceIds).forEach((supplierId) => {
        sourceIds[supplierId].forEach(async (addressId) => {
          if (!this.shipFromSources[supplierId]) {
            this.shipFromSources[supplierId] = []
          }
          if (
            !this.shipFromSources[supplierId].length ||
            this.shipFromSources[supplierId]
              .map((address) => address.ID)
              .indexOf(addressId) < 0
          ) {
            const address = await this.supplierFilterService.getSupplierAddress(
              supplierId,
              addressId
            )
            this.shipFromSources[supplierId] = [
              ...this.shipFromSources[supplierId],
              address,
            ]
          }
        })
      })
    } finally {
      window.scroll(0, 0)
      this.isProductListLoading = false
    }
  }
}

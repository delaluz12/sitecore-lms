import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ShopperContextService } from '../services/shopper-context/shopper-context.service'
import { takeWhile } from 'rxjs/operators'
import { ListPage } from 'ordercloud-javascript-sdk'
import { isEmpty as _isEmpty, uniq as _uniq } from 'lodash'
import { SupplierFilterService } from '../services/supplier-filter/supplier-filter.service'
import { HSMeProduct } from '@ordercloud/headstart-sdk'
import { ShipFromSourcesDic } from '../models/shipping.types'
import { AppConfig } from '../models/environment.types'
import { PromoModalComponent } from '../components/promo-modal/promo-modal.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  template: `
    <ocm-promo-banner *ngIf="showCustModal"></ocm-promo-banner>
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
  userGroup
  customerGroups = {
    prod: ['0001-0008', '0001-0005'],
    test: ['0002-0008', '0002-0005'],
  }

  partnerGroups = {
    prod: [
      '0001-0002',
      '0001-0003',
      '0001-0001',
      '2jWUqkAai02Z3JJP3ta79A',
      '0001-0007',
      '0001-0009',
    ],
    test: [
      '0002-0002',
      '0002-0003',
      '0002-0001',
      'E5YsxYZ_ykeEdHC9s9w_jQ',
      '0002-0007',
      '0002-0009',
    ],
  }

  constructor(
    public context: ShopperContextService,
    private supplierFilterService: SupplierFilterService,
    private activatedRoute: ActivatedRoute,
    private appConfig: AppConfig,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (_isEmpty(this.activatedRoute.snapshot.queryParams)) {
      this.context.categories.setActiveCategoryID(null)
    }
    this.context.productFilters.activeFiltersSubject
      .pipe(takeWhile(() => this.alive))
      .subscribe(this.handleFiltersChange)

    this.displayPromo()

    const shownModal = sessionStorage.getItem('modalShown')

    if (!shownModal && this.showCustModal) {
      this.openAlertDialog()
      sessionStorage.setItem('modalShown', 'true')
    }
  }

  displayPromo(): void {
    const env =
      this.appConfig.sellerName == 'Sitecore LMS TEST' ? 'test' : 'prod'
    const user = this.context.currentUser.get()
    const userGroups = user?.UserGroups.map((group) => group.ID)

    const getGroups = (groupType, env) => {
      const groups = groupType[env]
      return groups ? groups : []
    }

    const belongsToGroup = (groupType, env) => {
      return userGroups?.some((id) => getGroups(groupType, env).includes(id))
    }

    this.showCustModal = belongsToGroup(this.customerGroups, env) // '|| belongsToGroup(this.partnerGroups, env)' removed per Azure:28864
  }

  ngOnDestroy(): void {
    this.alive = false
  }

  openAlertDialog(): void {
    const dialogRef = this.dialog.open(PromoModalComponent, {
      height: 'auto',
      width: 'auto',
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

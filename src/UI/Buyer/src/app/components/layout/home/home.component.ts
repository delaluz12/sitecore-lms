import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { Component, OnInit } from '@angular/core'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'
import { HSMeProduct } from '@ordercloud/headstart-sdk'
import { PromoModalComponent } from '../../promo-modal/promo-modal.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class OCMHomePage implements OnInit {
  featuredProducts: HSMeProduct[]
  faBullhorn = faBullhorn
  URL = '../../../assets/jumbotron.svg'
  closeResult = ''

  constructor(
    private context: ShopperContextService,
    private dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    const user = this.context.currentUser.get()
    if (!user?.UserGroups?.length) {
      this.featuredProducts = []
    } else {
      const products = await this.context.tempSdk.listMeProducts({
        filters: { 'xp.Featured': true },
      })
      this.featuredProducts = products.Items
    }

    const shownModal = sessionStorage.getItem('modalShown')
    // only show for customers - userGroup = 0001-0008 or 0001-0005 (PROD)
    const showCustModal = user?.UserGroups.find(
      (item) => item.ID === '0001-0008' || item.ID === '0001-0005'
    )
      ? true
      : false
    if (!shownModal && showCustModal) {
      this.openAlertDialog()
      sessionStorage.setItem('modalShown', 'true')
    }
  }

  openAlertDialog(): void {
    const dialogRef = this.dialog.open(PromoModalComponent, {
      height: 'auto',
      width: 'auto',
    })
  }

  toSupplier(supplier: string): void {
    this.context.router.toProductList({
      activeFacets: { Supplier: supplier.toLocaleLowerCase() },
    })
  }
}

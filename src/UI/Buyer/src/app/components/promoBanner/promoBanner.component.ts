import { Component, OnInit } from '@angular/core'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'

@Component({
  selector: 'ocm-promo-banner',
  templateUrl: './promoBanner.component.html',
  styleUrls: ['./promoBanner.component.scss'],
})
export class PromoBannerComponent implements OnInit {
  message =
    '<strong>Sitecore Summer Savings:</strong> Don’t miss this chance to certify your skills with our <strong>20%</strong> promotion on all Sitecore certification exams all summer long! Use promo code <strong>CERTIFY20</strong> at checkout.<br> <em>Valid from July 1st through September 30th, 2024.</em>'
  buttonText = 'Learn More'

  constructor(private context: ShopperContextService) {}

  ngOnInit(): void {}
}

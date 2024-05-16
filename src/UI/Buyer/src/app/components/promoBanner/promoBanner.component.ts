import { Component, OnInit } from '@angular/core'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'

@Component({
  selector: 'ocm-promo-banner',
  templateUrl: './promoBanner.component.html',
  styleUrls: ['./promoBanner.component.scss'],
})
export class PromoBannerComponent implements OnInit {
  message =
    '<strong>Spring into Sitecore Learning with an exclusive 25% promotion!</strong><br> Use promo code <strong>SPRING25</strong> at checkout for 25% off your entire order. This offer is valid through June 30th, 2024.'
  buttonText = 'Learn More'

  constructor(private context: ShopperContextService) {}

  ngOnInit(): void {}
}

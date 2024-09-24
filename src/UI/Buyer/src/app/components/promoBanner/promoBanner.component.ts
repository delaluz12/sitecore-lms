import { Component, Input, OnInit } from '@angular/core'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'

@Component({
  selector: 'ocm-promo-banner',
  templateUrl: './promoBanner.component.html',
  styleUrls: ['./promoBanner.component.scss'],
})
export class PromoBannerComponent implements OnInit {
  @Input() message = ''
  buttonText = 'Learn More'

  constructor(private context: ShopperContextService) {}

  ngOnInit(): void {}
}

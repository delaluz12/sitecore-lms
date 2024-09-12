import { Component, OnInit } from '@angular/core'
import { ShopperContextService } from 'src/app/services/shopper-context/shopper-context.service'

@Component({
  selector: 'ocm-promo-banner',
  templateUrl: './promoBanner.component.html',
  styleUrls: ['./promoBanner.component.scss'],
})
export class PromoBannerComponent implements OnInit {
  message =
    '<strong>Unlock 25% Off Virtual Instructor-Led Training!</strong><br> Boost your skills from anywhere with our expert-led sessions. Use code <strong>LEARN25</strong> at checkout and save 25% on any of our Virtual Instructor-led Training, now through December 31, 2024.'
  buttonText = 'Learn More'

  constructor(private context: ShopperContextService) {}

  ngOnInit(): void {}
}

import { Injectable } from '@angular/core'
import * as jwtDecode_ from 'jwt-decode'
const jwtDecode = jwtDecode_
import { isUndefined as _isUndefined } from 'lodash'
import { Tokens } from 'ordercloud-javascript-sdk'
import { CookieService } from 'ngx-cookie'
import { AppConfig } from 'src/app/models/environment.types'
import { DecodedOCToken } from 'src/app/models/profile.types'

@Injectable({
  providedIn: 'root',
})
export class TokenHelperService {
  private isSSOCookieName = `${this.appConfig.appname
    .replace(/ /g, '_')
    .toLowerCase()}_isSSO`

  constructor(
    private appConfig: AppConfig,
    private cookieService: CookieService
  ) {}

  getDecodedOCToken(): DecodedOCToken {
    try {
      return jwtDecode(Tokens.GetAccessToken())
    } catch (e) {
      return null
    }
  }

  isTokenAnonymous(): boolean {
    return !_isUndefined(this.getAnonymousOrderID())
  }

  getAnonymousOrderID(): string | null {
    const token = this.getDecodedOCToken()
    return token ? token.orderid : null
  }

  setIsSSO(isSSO: boolean): void {
    this.cookieService.putObject(this.isSSOCookieName, { isSSO })
  }

  setProductCookie(id: string): void {
    this.cookieService.put('productID', id)
  }

  getProductCookie(): string {
    const productID = this.cookieService.get('productID')
    return productID ? productID : ''
  }

  removeProductCookie(): void {
    this.cookieService.remove('productID')
  }

  getIsSSO(): boolean {
    const obj = this.cookieService.getObject(this.isSSOCookieName) as {
      isSSO: boolean
    }
    return obj?.isSSO ?? false
  }
}

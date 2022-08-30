export interface CCTransactionResult {
    Succeeded?: boolean
    Amount?: number
    TransactionID?: string
    ResponseCode?: string
    AuthorizationCode?: string
    AVSResponseCode?: string
    Message?: string
}
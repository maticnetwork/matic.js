export type address = string

export declare interface SendOptions {
  from?: string
  value?: string | number
  gas?: string | number
  gasPrice?: string | number
  encodeAbi?: boolean
  parent?: boolean
  to?: string
}

export declare interface order {
  token: string
  amount: string | number
  expiry?: string | number
  orderId?: string
  spender?: string
}

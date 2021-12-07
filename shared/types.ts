export interface ProductTypes {
  sectionName: string
  variants: {
    name: string
    price: number
  }[]
  ingredients: string[]
  id?: string | number
}

export interface CartItems {
  ingredients: string[]
  sectionName: string
  variantName: string
  quantity: number
  id: number
  price: number
}

export interface Orders {
  address: string
  date: any
  id: number
  orderList: {
    id: number
    price: number
    quantity: number
    sectionName: string
    variantName: string
  }[]
  state: State
  total: number
  userId: string
  dateFns: any
  updateOrders?: any
}

export type State = "Espera de confirmar" | "Confirmado" | "Entregado"
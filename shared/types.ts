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

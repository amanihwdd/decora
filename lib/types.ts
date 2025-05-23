export interface Product {
  id: number
  name: string
  description: string
  images: string[]
  price: number
  category: string
  trending: boolean
  colors: string[]
  availability: string
  material?: string
  dimensions?: string
  weight?: string
  type?: string
}

export interface CartItem {
  id: number
  productId: number
  quantity: number
  color: string
}

export interface Category {
  name: string
  slug: string
  image: string
  description: string
  items: string
}

export type FilterOptions = {
  type: string | null
  material: string | null
  color: string | null
  price: string | null
  sort: string | null
}

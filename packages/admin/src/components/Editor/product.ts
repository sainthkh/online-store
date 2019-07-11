export interface Product {
  id: string
  name: string
  description: string
  featuredImage: string
  price: number
  discountedPrice?: number
  featured: Featured
  colors: Color[]
  sizes: string[]
  variations: Variation[]
  relatedProducts: string[]
  createdAt: Date
  updatedAt: Date
}

export enum Featured {
  NORMAL,
  NEW_ARRIVAL,
  BEST_SELLER,
  FEATURED,
}

export interface Color {
  colorHex: string
  name: string
  images: string[]
}

export interface EditableColor extends Color {
  id: string
}

export interface EditableSize {
  id: string
  size: string
}

export interface Variation {
  sku: string
  color: string
  size: string
  stock: number
}

export const emptyProduct: () => Product = () => ({
  id: '',
  name: '',
  description: '',
  featuredImage: '',
  price: 0,
  featured: Featured.NORMAL,
  colors: [],
  sizes: [],
  variations: [],
  relatedProducts: [],
  createdAt: new Date(),
  updatedAt: new Date(),
})

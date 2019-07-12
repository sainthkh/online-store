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

export interface ColorValue {
  colorHex: string
  name: string
}

export interface Color extends ColorValue {
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
  color: ColorValue
  size: string
  sku: string
  stock: number
}

export interface EditableVariation extends Variation {
  id: string
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

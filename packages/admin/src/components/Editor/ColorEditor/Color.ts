import { Color as ProductColor } from '../product'

export default interface Color extends ProductColor {
  id: string
  colorHex: string
  name: string
  images: string[]
}

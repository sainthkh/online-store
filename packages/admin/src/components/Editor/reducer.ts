import { EditableColor, Product, Color, EditableSize, EditableVariation } from './product'
import produce from 'immer'

interface State {
  name: string
  description: string
  colors: EditableColor[]
  nextColorId: number
  sizes: EditableSize[]
  nextSizeId: number
  variations: EditableVariation[]
  variationsNeedUpdate: boolean
}

// prettier-ignore
export type Action =
  | { type: 'CHANGE_NAME'; text: string}
  | { type: 'CHANGE_DESCRIPTION'; text: string }
  | { type: 'ADD_COLOR' }
  | { type: 'CHANGE_COLOR'; color: EditableColor }
  | { type: 'MOVE_COLOR'; dragIndex: number; hoverIndex: number }
  | { type: 'DELETE_COLOR'; id: string }
  | { type: 'ADD_SIZE'; size: string }
  | { type: 'CHANGE_SIZE'; size: EditableSize }
  | { type: 'MOVE_SIZE'; dragIndex: number; hoverIndex: number }
  | { type: 'DELETE_SIZE'; id: string }
  | { type: 'GENERATE_VARIATIONS' }
  | { type: 'UPDATE_VARIATIONS' }
  | { type: 'UPDATE_SKU'; id: string; sku: string }
  | { type: 'UPDATE_STOCK'; id: string; stock: number }

export interface InitArgs {
  product: Product
}

export const init = ({
  product: { name, description, colors: initialColors, sizes: initialSizes },
}: InitArgs) => {
  const colors = initialColors.map(({ colorHex, name: colorName, images }, i) => ({
    id: `color-${i}`,
    showColorPicker: false,
    colorHex,
    name: colorName,
    images,
  }))

  const sizes = initialSizes.map((size, i) => ({
    id: `size-${i}`,
    size,
  }))

  return {
    name,
    description,
    colors,
    nextColorId: colors.length,
    sizes,
    nextSizeId: sizes.length,
    variations: [],
    variationsNeedUpdate: true,
  }
}

export type ReducerFunc = (state: State, action: Action) => State

export const reducer: ReducerFunc = (state: State, action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'CHANGE_NAME': {
        draft.name = action.text
        return
      }
      case 'CHANGE_DESCRIPTION': {
        draft.description = action.text
        return
      }
      case 'ADD_COLOR': {
        const randomColors: Color[] = [
          { colorHex: '#f00', name: 'red', images: [] },
          { colorHex: '#0f0', name: 'green', images: [] },
          { colorHex: '#00f', name: 'blue', images: [] },
          { colorHex: '#fff', name: 'white', images: [] },
        ]

        const { colorHex, name, images } = randomColors[getRandomInt(0, 4)]
        draft.colors.push({
          id: `color-${state.nextColorId}`,
          colorHex,
          name,
          images,
        })
        draft.nextColorId = state.nextColorId + 1
        draft.variationsNeedUpdate = true
        return
      }
      case 'CHANGE_COLOR': {
        const colors = state.colors.map(color =>
          color.id === action.color.id ? action.color : color
        )
        draft.colors = colors

        let variations = generateVariations(colors, state.sizes)
        variations = fillVariationValues(variations, state.variations)
        draft.variations = variations
        return
      }
      case 'MOVE_COLOR': {
        const dragColor = state.colors[action.dragIndex]
        draft.colors.splice(action.dragIndex, 1)
        draft.colors.splice(action.hoverIndex, 0, dragColor)
        draft.variationsNeedUpdate = true
        return
      }
      case 'DELETE_COLOR': {
        draft.colors = state.colors.filter(color => color.id !== action.id)
        draft.variationsNeedUpdate = true
        return
      }
      case 'ADD_SIZE': {
        draft.sizes.push({
          id: `size-${state.nextSizeId}`,
          size: action.size,
        })
        draft.nextSizeId = state.nextSizeId + 1
        draft.variationsNeedUpdate = true
        return
      }
      case 'CHANGE_SIZE': {
        const sizes = state.sizes.map(size => (size.id === action.size.id ? action.size : size))
        draft.sizes = sizes

        let variations = generateVariations(state.colors, sizes)
        variations = fillVariationValues(variations, state.variations)
        draft.variations = variations
        return
      }
      case 'MOVE_SIZE': {
        const dragSize = state.sizes[action.dragIndex]
        draft.sizes.splice(action.dragIndex, 1)
        draft.sizes.splice(action.hoverIndex, 0, dragSize)
        draft.variationsNeedUpdate = true
        return
      }
      case 'DELETE_SIZE': {
        draft.sizes = state.sizes.filter(size => size.id !== action.id)
        draft.variationsNeedUpdate = true
        return
      }
      case 'GENERATE_VARIATIONS': {
        draft.variations = generateVariations(state.colors, state.sizes)
        draft.variationsNeedUpdate = false
        return
      }
      case 'UPDATE_VARIATIONS': {
        let variations = generateVariations(state.colors, state.sizes)
        variations = fillVariationValues(variations, state.variations)
        draft.variations = variations
        draft.variationsNeedUpdate = false
        return
      }
      case 'UPDATE_SKU': {
        draft.variations = state.variations.map(v => {
          return v.id === action.id
            ? {
                ...v,
                sku: action.sku,
              }
            : v
        })
        return
      }
      case 'UPDATE_STOCK': {
        draft.variations = state.variations.map(v => {
          return v.id === action.id
            ? {
                ...v,
                stock: action.stock,
              }
            : v
        })
        return
      }
      default:
        return state
    }
  })
}

const generateVariations = (
  colors: EditableColor[],
  sizes: EditableSize[]
): EditableVariation[] => {
  return colors
    .map(color => {
      return sizes.map(size => ({
        id: `${color.id}--${size.id}`,
        color: {
          colorHex: color.colorHex,
          name: color.name,
        },
        size: size.size,
        sku: '',
        stock: 0,
      }))
    })
    .flatMap(x => x)
}

const fillVariationValues = (
  newVars: EditableVariation[],
  oldVars: EditableVariation[]
): EditableVariation[] => {
  return newVars.map(n => {
    const oldVar = oldVars.find(o => o.id === n.id)
    return oldVar
      ? {
          ...n,
          sku: oldVar.sku,
          stock: oldVar.stock,
        }
      : n
  })
}

export default reducer

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

import { EditableColor, Product, Color, EditableSize } from './product'
import produce from 'immer'

interface State {
  name: string
  description: string
  colors: EditableColor[]
  nextColorId: number
  sizes: EditableSize[]
  nextSizeId: number
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

export interface InitArgs {
  product: Product
}

export const init = ({ product: { name, description, colors, sizes } }: InitArgs) => ({
  name,
  description,
  colors: colors.map(({ colorHex, name: colorName, images }, i) => ({
    id: `color-${i}`,
    showColorPicker: false,
    colorHex,
    name: colorName,
    images,
  })),
  nextColorId: colors.length,
  sizes: sizes.map((size, i) => ({
    id: `size-${i}`,
    size,
  })),
  nextSizeId: sizes.length,
})

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
        return
      }
      case 'CHANGE_COLOR': {
        draft.colors = state.colors.map(color =>
          color.id === action.color.id ? action.color : color
        )
        return
      }
      case 'MOVE_COLOR': {
        const dragColor = state.colors[action.dragIndex]
        draft.colors.splice(action.dragIndex, 1)
        draft.colors.splice(action.hoverIndex, 0, dragColor)
        return
      }
      case 'DELETE_COLOR': {
        draft.colors = state.colors.filter(color => color.id !== action.id)
        return
      }
      case 'ADD_SIZE': {
        draft.sizes.push({
          id: `size-${state.nextSizeId}`,
          size: action.size,
        })
        return
      }
      default:
        return state
    }
  })
}

export default reducer

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

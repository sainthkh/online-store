import React, { useReducer } from 'react'
import { styled } from '@beanovia/theme'
import { Color as ColorData } from '../product'
import Color from './Color'
import ProductColor from './ProductColor'

interface Props {
  colors: ColorData[]
  onChange: (colors: ColorData[]) => void
}

interface State {
  colors: Color[]
  nextId: number
}

// prettier-ignore
type Action = 
  | { type: 'ADD_COLOR' }
  | { type: 'CHANGE_COLOR'; color: Color }
  | { type: 'MOVE_COLOR'; dragIndex: number; hoverIndex: number }

interface InitArgs {
  initialColors: ColorData[]
}

const init = ({ initialColors }: InitArgs) => ({
  colors: initialColors.map(({ colorHex, name, images }, i) => ({
    id: `color-${i}`,
    showColorPicker: false,
    colorHex,
    name,
    images,
  })),
  nextId: initialColors.length,
})

export default ({ colors: initialColors, onChange }: Props) => {
  const reducer = React.useCallback(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'ADD_COLOR': {
          const randomColors: ColorData[] = [
            { colorHex: '#f00', name: 'red', images: [] },
            { colorHex: '#0f0', name: 'green', images: [] },
            { colorHex: '#00f', name: 'blue', images: [] },
            { colorHex: '#fff', name: 'white', images: [] },
          ]

          const { colorHex, name, images } = randomColors[getRandomInt(0, 4)]
          const newColors = [
            ...state.colors,
            {
              id: `color-${state.nextId}`,
              showColorPicker: false,
              colorHex,
              name,
              images,
            },
          ]
          onChange(newColors)

          return {
            ...state,
            colors: newColors,
            nextId: state.nextId + 1,
          }
        }
        case 'CHANGE_COLOR': {
          const newColors = state.colors.map(color =>
            color.id === action.color.id ? action.color : color
          )
          onChange(newColors)

          return {
            ...state,
            colors: newColors,
          }
        }
        case 'MOVE_COLOR': {
          const dragColor = state.colors[action.dragIndex]
          const newColors = state.colors
            .splice(action.dragIndex, 1)
            .splice(action.hoverIndex, 0, dragColor)

          return {
            ...state,
            colors: newColors,
          }
        }
        default:
          return state
      }
    },
    [onChange]
  )

  const [{ colors }, dispatch] = useReducer<(state: State, action: Action) => State, InitArgs>(
    reducer,
    {
      initialColors,
    },
    init
  )

  return (
    <div>
      {colors.map(color => {
        return (
          <ProductColor
            key={color.id}
            color={color}
            onChange={newColor => {
              dispatch({ type: 'CHANGE_COLOR', color: newColor })
            }}
          />
        )
      })}
      <div>
        <button
          onClick={() => {
            dispatch({ type: 'ADD_COLOR' })
          }}
        >
          Add Color
        </button>
      </div>
    </div>
  )
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

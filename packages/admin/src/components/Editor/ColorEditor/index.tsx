import React, { useReducer, useEffect } from 'react'
import produce from 'immer'
import { Color as ColorData } from '../product'
import Color from './Color'
import ProductColor from './ProductColor'
import { Button } from '../Button'

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
  | { type: 'DISPATCH_CHANGE' }

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

const reducer = (state: State, action: Action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_COLOR': {
        const randomColors: ColorData[] = [
          { colorHex: '#f00', name: 'red', images: [] },
          { colorHex: '#0f0', name: 'green', images: [] },
          { colorHex: '#00f', name: 'blue', images: [] },
          { colorHex: '#fff', name: 'white', images: [] },
        ]

        const { colorHex, name, images } = randomColors[getRandomInt(0, 4)]
        draft.colors.push({
          id: `color-${state.nextId}`,
          colorHex,
          name,
          images,
        })
        draft.nextId = state.nextId + 1

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
      default:
        return state
    }
  })
}

export default ({ colors: initialColors, onChange }: Props) => {
  const [{ colors }, dispatch] = useReducer<(state: State, action: Action) => State, InitArgs>(
    reducer,
    {
      initialColors,
    },
    init
  )

  useEffect(() => {
    onChange(colors)
  }, [colors])

  return (
    <div>
      {colors.map((color, i) => {
        return (
          <ProductColor
            key={color.id}
            color={color}
            index={i}
            onChange={newColor => {
              dispatch({ type: 'CHANGE_COLOR', color: newColor })
            }}
            onMove={(dragIndex, hoverIndex) => {
              dispatch({ type: 'MOVE_COLOR', dragIndex, hoverIndex })
            }}
          />
        )
      })}
      <div>
        <Button
          color='primary'
          onClick={() => {
            dispatch({ type: 'ADD_COLOR' })
          }}
        >
          Add Color
        </Button>
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

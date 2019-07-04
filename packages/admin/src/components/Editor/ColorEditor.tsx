import React, { useReducer } from 'react'
import { styled } from '@beanovia/theme'
import ChangeColor from 'color'
import { SketchPicker, ColorResult } from 'react-color'
import Popover from '../Popover'
import EditableDiv from './EditableDiv'
import { Color as ProductColor } from './product'

interface Color extends ProductColor {
  id: string
  colorHex: string
  showColorPicker: boolean
  name: string
  images: string[]
}

interface Props {
  colors: ProductColor[]
  onChange: (colors: ProductColor[]) => void
}

interface State {
  swatchEnabled: boolean
  currentSwatch: string
  colors: Color[]
  nextId: number
}

// prettier-ignore
type Action = 
  | { type: 'SHOW_COLOR_PICKER'; id: string; show: boolean }
  | { type: 'ADD_COLOR' }
  | { type: 'CHANGE_COLOR'; id: string; color: string }
  | { type: 'ENABLE_SWATCH_CLICK'; enable: boolean }

interface InitArgs {
  initialColors: ProductColor[]
}

const init = ({ initialColors }: InitArgs) => ({
  swatchEnabled: true,
  currentSwatch: '',
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
        case 'SHOW_COLOR_PICKER': {
          const newColors = state.colors.map(color => {
            if (color.id === action.id) {
              return {
                ...color,
                showColorPicker: action.show,
              }
            } else {
              return color
            }
          })

          return {
            ...state,
            currentSwatch: action.id,
            colors: newColors,
          }
        }
        case 'ADD_COLOR': {
          const randomColors: ProductColor[] = [
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
          const newColors = state.colors.map(color => {
            if (color.id === action.id) {
              return {
                ...color,
                colorHex: action.color,
              }
            } else {
              return color
            }
          })
          onChange(newColors)

          return {
            ...state,
            colors: newColors,
          }
        }
        case 'ENABLE_SWATCH_CLICK':
          return {
            ...state,
            swatchEnabled: action.enable,
          }
        default:
          return state
      }
    },
    [onChange]
  )

  const [{ swatchEnabled, currentSwatch, colors }, dispatch] = useReducer<
    (state: State, action: Action) => State,
    InitArgs
  >(
    reducer,
    {
      initialColors,
    },
    init
  )

  return (
    <div>
      {colors.map(({ id, colorHex, name, showColorPicker, images }) => {
        return (
          <ColorItem key={id}>
            <ColorName>
              <ColorButton>
                <Swatch
                  color={colorHex}
                  onClick={() => {
                    if (swatchEnabled || currentSwatch !== id) {
                      dispatch({ type: 'SHOW_COLOR_PICKER', id, show: true })
                    }
                  }}
                />
                {showColorPicker ? (
                  <Popover
                    onChange={() => {
                      dispatch({ type: 'ENABLE_SWATCH_CLICK', enable: false })
                      setTimeout(() => {
                        dispatch({ type: 'ENABLE_SWATCH_CLICK', enable: true })
                      }, 150)
                      dispatch({ type: 'SHOW_COLOR_PICKER', id, show: false })
                    }}
                  >
                    <SketchPicker
                      color={colorHex}
                      onChange={(pickedColor: ColorResult) => {
                        dispatch({ type: 'CHANGE_COLOR', id, color: pickedColor.hex })
                      }}
                    />
                  </Popover>
                ) : null}
              </ColorButton>
              <EditableDiv text={name} />
            </ColorName>
            <div>
              <button>Add Image</button>
            </div>
          </ColorItem>
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

interface SwatchProps {
  color: string
}

const ColorItem = styled.div(({ theme: { spacing } }) => ({
  padding: `${spacing.small}px ${spacing.base}px`,
}))

const ColorName = styled.div(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: spacing.tiny,
}))

const ColorButton = styled.div(({ theme: { spacing } }) => ({
  position: 'relative',
  marginRight: spacing.base,
}))

const Swatch = styled.div<SwatchProps>(({ color }) => ({
  width: 20,
  height: 20,
  borderRadius: 10,

  background: color,
  borderWidth: 1.5,
  borderStyle: 'solid',
  borderColor: ChangeColor(color)
    .darken(0.6)
    .string(),
}))

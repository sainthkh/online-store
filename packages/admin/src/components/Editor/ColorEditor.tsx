import React, { useReducer } from 'react'
import { styled } from '@beanovia/theme'
import ChangeColor from 'color'
import { SketchPicker, ColorResult } from 'react-color'
import Popover from '../Popover'
import EditableDiv from './EditableDiv'
import { Color } from './product'

interface State {
  swatchEnabled: boolean
  currentSwatch: string
  colors: Color[]
}

// prettier-ignore
type Action = 
  | { type: 'SHOW_COLOR_PICKER'; id: string; show: boolean }
  | { type: 'CHANGE_COLOR'; id: string; color: string }
  | { type: 'ENABLE_SWATCH_CLICK'; enable: boolean }

export default () => {
  const [{ swatchEnabled, currentSwatch, colors }, dispatch] = useReducer<
    (state: State, action: Action) => State
  >(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'SHOW_COLOR_PICKER':
          return {
            ...state,
            currentSwatch: action.id,
            colors: state.colors.map(color => {
              if (color.id === action.id) {
                return {
                  ...color,
                  showColorPicker: action.show,
                }
              } else {
                return color
              }
            }),
          }
        case 'CHANGE_COLOR':
          return {
            ...state,
            colors: state.colors.map(color => {
              if (color.id === action.id) {
                return {
                  ...color,
                  colorHex: action.color,
                }
              } else {
                return color
              }
            }),
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
    {
      swatchEnabled: true,
      currentSwatch: '',
      colors: [
        {
          id: 'color-1',
          colorHex: '#f00',
          showColorPicker: false,
          name: 'red',
          images: [],
        },
        {
          id: 'color-2',
          colorHex: '#0f0',
          showColorPicker: false,
          name: 'green',
          images: [],
        },
      ],
    }
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
    </div>
  )
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

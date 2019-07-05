import React, { useReducer } from 'react'
import ChangeColor from 'color'
import Color from './Color'
import Popover from '../../Popover'
import { SketchPicker, ColorResult } from 'react-color'
import EditableDiv from '../EditableDiv'
import { styled } from '@beanovia/theme'
import Sortable from '../Sortable'
import { COLOR } from './itemTypes'

interface Props {
  color: Color
  index: number
  onChange: (color: Color) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
}

interface State {
  swatchClickEnabled: boolean
  showColorPicker: boolean
}

// prettier-ignore
type Action = 
  | { type: 'SHOW_COLOR_PICKER'; show: boolean }
  | { type: 'ENABLE_SWATCH_CLICK'; enable: boolean }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SHOW_COLOR_PICKER': {
      return {
        ...state,
        showColorPicker: action.show,
      }
    }
    case 'ENABLE_SWATCH_CLICK': {
      return {
        ...state,
        swatchClickEnabled: action.enable,
      }
    }
    default:
      return state
  }
}

export default ({ color: { id, name, colorHex, images }, onChange, index, onMove }: Props) => {
  const [{ showColorPicker, swatchClickEnabled }, dispatch] = useReducer(reducer, {
    swatchClickEnabled: true,
    showColorPicker: false,
  })

  return (
    <Sortable itemType={COLOR} itemId={id} index={index} onMove={onMove}>
      <ColorItem>
        <ColorName>
          <ColorButton>
            <Swatch
              color={colorHex}
              onClick={() => {
                if (swatchClickEnabled) {
                  dispatch({ type: 'SHOW_COLOR_PICKER', show: true })
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
                  dispatch({ type: 'SHOW_COLOR_PICKER', show: false })
                }}
              >
                <SketchPicker
                  color={colorHex}
                  onChange={(pickedColor: ColorResult) => {
                    onChange({
                      id,
                      colorHex: pickedColor.hex,
                      name,
                      images,
                    })
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
    </Sortable>
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

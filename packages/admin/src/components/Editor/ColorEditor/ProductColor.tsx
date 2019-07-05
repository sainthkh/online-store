import React, { useState, useReducer } from 'react'
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

export default ({ color: { id, name, colorHex, images }, onChange, index, onMove }: Props) => {
  const [show, showColorPicker] = useState<boolean>(false)
  const [enabled, enableSwatch] = useState<boolean>(true)

  return (
    <Sortable itemType={COLOR} itemId={id} index={index} onMove={onMove}>
      <ColorItem>
        <ColorName>
          <ColorButton>
            <Swatch
              color={colorHex}
              onClick={() => {
                if (enabled) {
                  showColorPicker(true)
                }
              }}
            />
            {show ? (
              <Popover
                onClose={() => {
                  enableSwatch(false)
                  setTimeout(() => {
                    enableSwatch(true)
                  }, 150)
                  showColorPicker(false)
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

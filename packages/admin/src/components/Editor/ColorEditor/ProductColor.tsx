import React, { useState } from 'react'
import ChangeColor from 'color'
import Color from './Color'
import Popover from '../../Popover'
import { SketchPicker, ColorResult } from 'react-color'
import EditableDiv from '../components/EditableDiv'
import { styled } from '@beanovia/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Sortable from '../components/SortableV'
import { COLOR } from '../itemTypes'

interface Props {
  color: Color
  index: number
  onChange: (color: Color) => void
  onMove: (dragIndex: number, hoverIndex: number) => void
  onDelete: () => void
}

export default ({
  color: { id, name, colorHex, images },
  onChange,
  index,
  onMove,
  onDelete,
}: Props) => {
  const [show, showColorPicker] = useState<boolean>(false)
  const [enabled, enableSwatch] = useState<boolean>(true)
  const [isNameEditting, nameIsEditting] = useState<boolean>(false)
  const [deleteButton, showDeleteButton] = useState<boolean>(false)

  return (
    <Sortable itemType={COLOR} itemId={id} index={index} onMove={onMove}>
      <ColorItem
        onMouseEnter={() => {
          if (!isNameEditting) {
            showDeleteButton(true)
          }
        }}
        onMouseLeave={() => {
          showDeleteButton(false)
        }}
      >
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
          <EditableDiv
            text={name}
            onChange={(newName: string) => {
              onChange({
                id,
                colorHex,
                name: newName,
                images,
              })
            }}
            onActivate={(activate: boolean) => {
              nameIsEditting(activate)
              showDeleteButton(false)
            }}
          />
          {deleteButton ? (
            <DeleteButton
              onClick={() => {
                onDelete()
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>
          ) : null}
        </ColorName>
        <div>
          <Button color='secondary'>Add Image</Button>
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

  cursor: 'pointer',
}))

const DeleteButton = styled.button(({ theme: { colors, spacing } }) => ({
  marginLeft: 'auto',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: spacing.xtiny,
  borderRadius: spacing.xtiny,

  ':hover': {
    background: colors.gray_dark,
  },
}))

export const Button = styled.button(({ theme: { colors, spacing, text } }) => ({
  border: 'none',
  borderRadius: 3,
  padding: `${spacing.xtiny}px ${spacing.tiny}px`,
  background: colors.white,
  boxShadow: `1px 1px 3px 1px ${colors.gray_darker}`,
  cursor: 'pointer',
  ...text.small,

  ':hover': {
    background: colors.secondary_dark,
  },
}))

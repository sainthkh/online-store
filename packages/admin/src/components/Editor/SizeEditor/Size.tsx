import React, { useContext, useState } from 'react'
import DispatchContext from '../Context'
import EditableDiv from '../components/EditableDiv'
import { EditableSize } from '../product'
import { styled } from '@beanovia/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Sortable from '../components/SortableH'
import { SIZE } from '../itemTypes'

interface Props {
  size: EditableSize
  index: number
}

export default ({ size, index }: Props) => {
  const dispatch = useContext(DispatchContext)
  const [deleteButton, showDeleteButton] = useState<boolean>(false)
  const [isNameEditting, nameIsEditting] = useState<boolean>(false)

  return (
    <Sortable
      itemType={SIZE}
      itemId={size.id}
      index={index}
      onMove={(dragIndex, hoverIndex) => {
        dispatch({ type: 'MOVE_SIZE', dragIndex, hoverIndex })
      }}
    >
      <Wrap
        onMouseEnter={() => {
          if (!isNameEditting) {
            showDeleteButton(true)
          }
        }}
        onMouseLeave={() => {
          showDeleteButton(false)
        }}
      >
        <EditableDiv
          text={size.size}
          onChange={(text: string) => {
            dispatch({
              type: 'CHANGE_SIZE',
              size: {
                id: size.id,
                size: text,
              },
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
              dispatch({
                type: 'DELETE_SIZE',
                id: size.id,
              })
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </DeleteButton>
        ) : null}
      </Wrap>
    </Sortable>
  )
}

const Wrap = styled.div(({ theme: { colors, spacing } }) => ({
  display: 'flex',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  marginRight: spacing.small,
  border: `2px solid ${colors.secondary}`,
  borderRadius: spacing.xtiny,
  cursor: 'pointer',
}))

const DeleteButton = styled.button(({ theme: { colors, spacing } }) => ({
  marginLeft: spacing.tiny,
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  padding: spacing.xtiny,
  borderRadius: spacing.xtiny,

  ':hover': {
    background: colors.gray_dark,
  },
}))

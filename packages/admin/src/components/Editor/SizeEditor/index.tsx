import React, { useContext, ChangeEvent, useReducer } from 'react'
import DispatchContext from '../Context'
import { styled } from '@beanovia/theme'
import { Button } from '../Button'
import { EditableSize } from '../product'
import Size from './Size'

interface Props {
  sizes: EditableSize[]
}

interface State {
  newSize: string
  showError: boolean
}

// prettier-ignore
type Action = 
  | { type: 'CHANGE_NEW_SIZE'; size: string }
  | { type: 'ADD_SIZE'; size: string }
  | { type: 'SHOW_ERROR' }

const init: State = {
  newSize: '',
  showError: false,
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_NEW_SIZE': {
      return {
        ...state,
        newSize: action.size,
      }
    }
    case 'ADD_SIZE': {
      return {
        ...state,
        newSize: '',
        showError: false,
      }
    }
    case 'SHOW_ERROR': {
      return {
        ...state,
        showError: true,
      }
    }
    default:
      return state
  }
}

export default ({ sizes }: Props) => {
  const editorDispatch = useContext(DispatchContext)
  const [{ newSize, showError }, dispatch] = useReducer(reducer, init)

  return (
    <SizeEditor>
      <Sizes>
        {sizes.map(({ id, size }) => {
          return (
            <Size
              key={id}
              size={size}
              onChange={(text: string) => {
                editorDispatch({
                  type: 'CHANGE_SIZE',
                  size: {
                    id,
                    size: text,
                  },
                })
              }}
            />
          )
        })}
      </Sizes>
      <AddSizeWrap>
        <AddSizeInput
          type='text'
          value={newSize}
          placeholder='new size value'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'CHANGE_NEW_SIZE', size: event!.target!.value })
          }}
        />
        <Button
          onClick={() => {
            if (newSize.length > 0) {
              editorDispatch({ type: 'ADD_SIZE', size: newSize })
              dispatch({ type: 'ADD_SIZE', size: newSize })
            } else {
              dispatch({ type: 'SHOW_ERROR' })
            }
          }}
        >
          Add Size
        </Button>
      </AddSizeWrap>
      {showError ? <Error>Size should not be empty.</Error> : null}
    </SizeEditor>
  )
}

const SizeEditor = styled.div({})

const Sizes = styled.div({})

const AddSizeWrap = styled.div({
  display: 'flex',
})

const AddSizeInput = styled.input(({ theme: { spacing, text } }) => ({
  display: 'block',
  padding: `${spacing.xtiny}px ${spacing.tiny}px`,
  marginRight: spacing.small,
  ...text.regular,
  boxSizing: 'border-box',
}))

const Error = styled.div(({ theme: { colors } }) => ({
  color: colors.error,
}))

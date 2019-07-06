import React, { useReducer, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react'
import { styled } from '@beanovia/theme'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useOutsideClickDetector } from '../hooks'

interface Props {
  text: string
}

type Mode = 'DIV' | 'INPUT'

interface State {
  mode: Mode
  text: string
  savedText: string
  giveFocus: boolean
}

// prettier-ignore
type Action = 
  | { type: 'CHANGE_TO_INPUT' }
  | { type: 'SET_TEXT' }
  | { type: 'RESET_TEXT' }
  | { type: 'CHANGE_TEXT'; text: string }
  | { type: 'FOCUS_GIVEN' }

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_TO_INPUT':
      return {
        ...state,
        mode: 'INPUT' as Mode,
        giveFocus: true,
        savedText: state.text,
      }
    case 'FOCUS_GIVEN':
      return {
        ...state,
        giveFocus: false,
      }
    case 'CHANGE_TEXT':
      return {
        ...state,
        text: action.text,
      }
    case 'SET_TEXT':
      return {
        ...state,
        mode: 'DIV' as Mode,
        text: state.text,
      }
    case 'RESET_TEXT':
      return {
        ...state,
        mode: 'DIV' as Mode,
        text: state.savedText,
      }
    default:
      return state
  }
}

export default ({ text: initialText }: Props) => {
  const [{ mode, text, giveFocus }, dispatch] = useReducer<(state: State, action: Action) => State>(
    reducer,
    {
      mode: 'DIV' as Mode,
      text: initialText,
      savedText: initialText,
      giveFocus: false,
    }
  )

  const divRef = useRef<HTMLDivElement>(null!)
  const inputRef = useRef<HTMLInputElement>(null!)
  useOutsideClickDetector(divRef, () => {
    dispatch({ type: 'RESET_TEXT' })
  })

  useEffect(() => {
    if (giveFocus) {
      inputRef.current.focus()
      dispatch({ type: 'FOCUS_GIVEN' })
    }
  })

  return mode === 'DIV' ? (
    <Div
      onClick={() => {
        dispatch({ type: 'CHANGE_TO_INPUT' })
      }}
    >
      {text}
    </Div>
  ) : (
    <InputWrap ref={divRef}>
      <Input
        ref={inputRef}
        type='text'
        value={text}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: 'CHANGE_TEXT', text: event!.target!.value })
        }}
        onKeyPress={(event: KeyboardEvent<HTMLInputElement>) => {
          // KeyPress cannot detect Escape
          if (event.key === 'Enter') {
            dispatch({ type: 'SET_TEXT' })
          }
        }}
        onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => {
          // KeyUp cannot detect Enter
          if (event.key === 'Escape') {
            dispatch({ type: 'RESET_TEXT' })
          }
        }}
      />
      <InputMenu>
        <SaveButton
          onClick={() => {
            dispatch({ type: 'SET_TEXT' })
          }}
        >
          Save
        </SaveButton>
        <CancelButton
          onClick={() => {
            dispatch({ type: 'RESET_TEXT' })
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </CancelButton>
      </InputMenu>
    </InputWrap>
  )
}

const Div = styled.div(({ theme: { text } }) => ({
  ...text.regular,
  cursor: 'pointer',
}))

const InputWrap = styled.div({
  width: '100%',
})

const Input = styled.input(({ theme: { spacing, text } }) => ({
  display: 'block',
  padding: `${spacing.xtiny}px ${spacing.tiny}px`,
  ...text.regular,
  boxSizing: 'border-box',
  width: '100%',
}))

const InputMenu = styled.div(({ theme: { spacing } }) => ({
  display: 'flex',
  marginTop: spacing.xtiny,
}))

export const SaveButton = styled.button(({ theme: { colors, spacing, text } }) => ({
  display: 'block',
  border: 'none',
  borderRadius: 2,
  padding: `${spacing.xtiny}px ${spacing.tiny}px`,
  background: colors.primary,
  color: colors.white,
  boxShadow: `1px 1px 2px 1px ${colors.gray_darker}`,
  cursor: 'pointer',
  ...text.small,

  ':hover': {
    background: colors.primary_dark,
  },
}))

export const CancelButton = styled.button(({ theme: { colors, spacing, text } }) => ({
  display: 'block',
  border: 'none',
  borderRadius: 2,
  padding: `${spacing.xtiny}px ${spacing.tiny}px`,
  cursor: 'pointer',
  background: 'inherit',
  ...text.small,
  marginLeft: spacing.tiny,

  ':hover': {
    background: colors.gray_dark,
  },
}))

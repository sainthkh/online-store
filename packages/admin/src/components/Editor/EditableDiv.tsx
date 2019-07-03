import React, { useReducer, useRef, ChangeEvent, KeyboardEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useOutsideClickDetector } from '../hooks'

interface Props {
  text: string
}

interface State {
  mode: 'DIV' | 'INPUT'
  text: string
  savedText: string
}

// prettier-ignore
type Action = 
  | { type: 'CHANGE_TO_INPUT' }
  | { type: 'SET_TEXT' }
  | { type: 'RESET_TEXT' }
  | { type: 'CHANGE_TEXT'; text: string }

export default ({ text: initialText }: Props) => {
  const [{ mode, text }, dispatch] = useReducer<(state: State, action: Action) => State>(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'CHANGE_TO_INPUT':
          return {
            ...state,
            mode: 'INPUT',
            savedText: state.text,
          }
        case 'CHANGE_TEXT':
          return {
            ...state,
            text: action.text,
          }
        case 'SET_TEXT':
          return {
            ...state,
            mode: 'DIV',
            text: state.text,
          }
        case 'RESET_TEXT':
          return {
            ...state,
            mode: 'DIV',
            text: state.savedText,
          }
        default:
          return state
      }
    },
    {
      mode: 'DIV',
      text: initialText,
      savedText: initialText,
    }
  )
  const ref = useRef<HTMLInputElement>(null!)
  useOutsideClickDetector(ref, () => {
    dispatch({ type: 'RESET_TEXT' })
  })

  return mode === 'DIV' ? (
    <div
      onClick={() => {
        dispatch({ type: 'CHANGE_TO_INPUT' })
      }}
    >
      {text}
    </div>
  ) : (
    <div ref={ref}>
      <div>
        <input
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
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: 'SET_TEXT' })
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            dispatch({ type: 'RESET_TEXT' })
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  )
}

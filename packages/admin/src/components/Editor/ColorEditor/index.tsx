import React, { useContext } from 'react'
import DispatchContext from '../Context'
import { EditableColor } from '../product'
import ProductColor from './ProductColor'
import { Button } from '../components/Button'

interface Props {
  colors: EditableColor[]
}

export default ({ colors }: Props) => {
  const dispatch = useContext(DispatchContext)

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
            onDelete={() => {
              dispatch({ type: 'DELETE_COLOR', id: color.id })
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

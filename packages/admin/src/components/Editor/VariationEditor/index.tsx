import React, { useContext, ChangeEvent } from 'react'
import DispatchContext from '../Context'
import { EditableVariation } from '../product'

interface Props {
  variations: EditableVariation[]
  needsUpdate: boolean
}

export default ({ variations, needsUpdate }: Props) => {
  const dispatch = useContext(DispatchContext)

  return (
    <>
      {needsUpdate ? (
        variations.length === 0 ? (
          <div>
            Variations aren't generated yet.
            <button
              onClick={() => {
                dispatch({ type: 'GENERATE_VARIATIONS' })
              }}
            >
              Generate Variations
            </button>
          </div>
        ) : (
          <div>
            Colors or sizes are added or removed. Needs update.{' '}
            <button
              onClick={() => {
                dispatch({ type: 'UPDATE_VARIATIONS' })
              }}
            >
              Update Variations
            </button>
          </div>
        )
      ) : null}
      <table>
        <thead>
          <tr>
            <th>color</th>
            <th>size</th>
            <th>sku</th>
            <th>stock</th>
          </tr>
        </thead>
        <tbody>
          {variations.length === 0 ? (
            <tr>
              <td colSpan={4}>There is no variation</td>
            </tr>
          ) : (
            variations.map(v => (
              <tr key={v.id}>
                <td>{v.color.name}</td>
                <td>{v.size}</td>
                <td>
                  <input
                    type='text'
                    value={v.sku}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      dispatch({ type: 'UPDATE_SKU', id: v.id, sku: event!.target!.value })
                    }}
                  />
                </td>
                <td>
                  <input
                    type='number'
                    value={v.stock}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      if (event!.target!.validity!.valid) {
                        dispatch({
                          type: 'UPDATE_STOCK',
                          id: v.id,
                          stock: parseInt(event!.target!.value, 10),
                        })
                      }
                    }}
                    pattern='^[0-9]\d*$'
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  )
}

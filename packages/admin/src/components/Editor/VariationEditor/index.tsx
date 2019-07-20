import React, { useContext, ChangeEvent } from 'react'
import DispatchContext from '../Context'
import { EditableVariation } from '../product'
import { Button as ButtonBase } from '../components/Button'
import { styled } from '@beanovia/theme'

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
          <MessageBox>
            Variations aren't generated yet.
            <Button
              onClick={() => {
                dispatch({ type: 'GENERATE_VARIATIONS' })
              }}
            >
              Generate Variations
            </Button>
          </MessageBox>
        ) : (
          <MessageBox>
            Colors or sizes are added or removed. Needs update.{' '}
            <Button
              onClick={() => {
                dispatch({ type: 'UPDATE_VARIATIONS' })
              }}
            >
              Update Variations
            </Button>
          </MessageBox>
        )
      ) : null}
      <Table>
        <Thead>
          <tr>
            <Th>color</Th>
            <Th>size</Th>
            <Th>sku</Th>
            <Th>stock</Th>
          </tr>
        </Thead>
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
                  <Input
                    type='text'
                    value={v.sku}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      dispatch({ type: 'UPDATE_SKU', id: v.id, sku: event!.target!.value })
                    }}
                  />
                </td>
                <td>
                  <Input
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
      </Table>
    </>
  )
}

const MessageBox = styled.div(({ theme: { spacing, text } }) => ({
  ...text.large,
  marginBottom: spacing.small,
}))

const Button = styled(ButtonBase)(({ theme: { spacing } }) => ({
  marginLeft: spacing.base,
}))

const Table = styled.table({
  width: '100%',
})

const Thead = styled.thead(({ theme: { colors } }) => ({
  background: colors.black,
  color: colors.white,
}))

const Th = styled.th(({ theme: { spacing } }) => ({
  padding: spacing.tiny,
}))

const Input = styled.input({
  width: '100%',
  boxSizing: 'border-box',
})

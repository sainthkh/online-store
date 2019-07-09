import React, { useReducer, ChangeEvent } from 'react'
import { styled } from '@beanovia/theme'
import DispatchContext from './Context'
import ColorEditor from './ColorEditor'
import SizeEditor from './SizeEditor'
import { Product } from './product'
import reducer, { ReducerFunc, InitArgs, init } from './reducer'

interface Props {
  product: Product
}

export default ({ product }: Props) => {
  const [{ name, description, colors }, dispatch] = useReducer<ReducerFunc, InitArgs>(
    reducer,
    { product },
    init
  )

  return (
    <DispatchContext.Provider value={dispatch}>
      <FlexBox>
        <Main>
          <FormGroup>
            <Label htmlFor='name'>Product Name</Label>
            <Name
              id='name'
              type='text'
              placeholder='name'
              value={name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                dispatch({ type: 'CHANGE_NAME', text: event!.target!.value })
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='description'>Description</Label>
            <Description
              rows={10}
              placeholder='description'
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                dispatch({ type: 'CHANGE_DESCRIPTION', text: event!.target!.value })
              }}
              value={description}
            />
          </FormGroup>
          <FormGroup>
            <Label>Colors / Images</Label>
            <ColorEditor colors={colors} />
          </FormGroup>
          <FormGroup>
            <Label>Sizes</Label>
            <SizeEditor />
          </FormGroup>
          <FormGroup>
            <Label>Variations</Label>
            <table>
              <thead>
                <tr>
                  <th>sku</th>
                  <th>color</th>
                  <th>size</th>
                  <th>stock</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type='text' />
                  </td>
                  <td>
                    <input type='text' />
                  </td>
                  <td>
                    <input type='text' />
                  </td>
                  <td>
                    <input type='text' />
                  </td>
                </tr>
              </tbody>
            </table>
          </FormGroup>
        </Main>
        <Side>
          <FormGroup>
            <Label htmlFor='price'>Price</Label>
            <Input id='price' type='text' placeholder='price' />
          </FormGroup>
          <FormGroup>
            <Label htmlFor='discountedPrice'>Discounted Price</Label>
            <Input id='discountedPrice' type='text' placeholder='discountedPrice' />
          </FormGroup>
          <FormGroup>
            <Label>Featured Image</Label>
          </FormGroup>
          <FormGroup>
            <Label>Featured</Label>
          </FormGroup>
        </Side>
      </FlexBox>
    </DispatchContext.Provider>
  )
}

const FlexBox = styled.div({
  display: 'flex',
})

const Main = styled.div({
  width: '100%',
})

const FormGroup = styled.div({
  width: '100%',
})

const Label = styled.label(({ theme: { spacing, text } }) => ({
  display: 'block',
  ...text.h3,
  marginTop: spacing.small,
  marginBottom: spacing.small,
}))

const Name = styled.input(({ theme: { spacing, text } }) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  ...text.large,
}))

const Description = styled.textarea(({ theme: { spacing, text } }) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  ...text.regular,
}))

const Side = styled.div(({ theme: { spacing } }) => ({
  width: 300,
  flexShrink: 0,
  marginLeft: spacing.base,
}))

const Input = styled.input({
  width: '100%',
})

import React from 'react'
import { styled } from '@beanovia/theme'
import ColorEditor from './ColorEditor'

export default () => (
  <FlexBox>
    <Main>
      <FormGroup>
        <Label htmlFor='name'>Product Name</Label>
        <Name id='name' type='text' placeholder='name' />
      </FormGroup>
      <FormGroup>
        <Label htmlFor='description'>Description</Label>
        <textarea placeholder='description' />
      </FormGroup>
      <FormGroup>
        <Label>Colors / Images</Label>
        <ColorEditor />
      </FormGroup>
      <FormGroup>
        <Label>Sizes</Label>
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
)

const FlexBox = styled.div({
  display: 'flex',
})

const Main = styled.div({
  width: '100%',
})

const FormGroup = styled.div({
  width: '100%',
})

const Label = styled.label({
  display: 'block',
})

const Name = styled.input({
  width: '100%',
})

const Side = styled.div(({ theme: { spacing } }) => ({
  width: 300,
  flexShrink: 0,
  marginLeft: spacing.base,
}))

const Input = styled.input({
  width: '100%',
})

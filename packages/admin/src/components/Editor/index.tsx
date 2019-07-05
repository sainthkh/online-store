import React, { useReducer, ChangeEvent } from 'react'
import { styled } from '@beanovia/theme'
import ColorEditor from './ColorEditor'
import { Product, Color } from './product'

interface Props {
  product: Product
}

interface State {
  product: Product
}

// prettier-ignore
type Action = 
  | { type: 'CHANGE_NAME'; text: string }
  | { type: 'CHANGE_DESCRIPTION'; text: string }
  | { type: 'CHANGE_COLOR'; colors: Color[] }

interface InitArgs {
  initialProduct: Product
}

const init = ({ initialProduct }: InitArgs) => ({
  product: initialProduct,
})

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        product: {
          ...state.product,
          name: action.text,
        },
      }
    case 'CHANGE_DESCRIPTION':
      return {
        product: {
          ...state.product,
          description: action.text,
        },
      }
    case 'CHANGE_COLOR':
      return {
        product: {
          ...state.product,
          colors: action.colors,
        },
      }
    default:
      return state
  }
}

export default ({ product: initialProduct }: Props) => {
  const [{ product }, dispatch] = useReducer<(state: State, action: Action) => State, InitArgs>(
    reducer,
    {
      initialProduct,
    },
    init
  )

  return (
    <FlexBox>
      <Main>
        <FormGroup>
          <Label htmlFor='name'>Product Name</Label>
          <Name
            id='name'
            type='text'
            placeholder='name'
            value={product.name}
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
          />
        </FormGroup>
        <FormGroup>
          <Label>Colors / Images</Label>
          <ColorEditor
            colors={product.colors}
            onChange={(colors: Color[]) => {
              dispatch({ type: 'CHANGE_COLOR', colors })
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label>Sizes</Label>
          <Sizes>
            <button>Add Size</button>
          </Sizes>
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

const Sizes = styled.div({})

const Side = styled.div(({ theme: { spacing } }) => ({
  width: 300,
  flexShrink: 0,
  marginLeft: spacing.base,
}))

const Input = styled.input({
  width: '100%',
})

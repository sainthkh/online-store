import React, { useReducer, ChangeEvent } from 'react'
import { styled } from '@beanovia/theme'
import DispatchContext from './Context'
import ColorEditor from './ColorEditor'
import SizeEditor from './SizeEditor'
import VariationEditor from './VariationEditor'
import PriceEditor from './PriceEditor'
import { Product } from './product'
import reducer, { ReducerFunc, InitArgs, init } from './reducer'
import { FormGroup, Label } from './components/Form'

interface Props {
  product: Product
}

export default ({ product }: Props) => {
  const [
    {
      name,
      description,
      colors,
      sizes,
      variations,
      variationsNeedUpdate,
      price,
      discountRate,
      discountedPrice,
    },
    dispatch,
  ] = useReducer<ReducerFunc, InitArgs>(reducer, { product }, init)

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
            <SizeEditor sizes={sizes} />
          </FormGroup>
          <FormGroup>
            <Label>Variations</Label>
            <VariationEditor variations={variations} needsUpdate={variationsNeedUpdate} />
          </FormGroup>
        </Main>
        <Side>
          <PriceEditor
            price={price}
            discountRate={discountRate}
            discountedPrice={discountedPrice}
          />
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

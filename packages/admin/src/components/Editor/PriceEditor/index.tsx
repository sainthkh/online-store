import React, { useState, ChangeEvent, useContext } from 'react'
import DispatchContext from '../Context'
import { FormGroup, Label, FormSection, SectionHead, FormInput } from '../components/Form'

interface Props {
  price: number
  discountedPrice?: number
  discountRate?: number
}

enum DiscountState {
  NO_DISCOUNT,
  DISCOUNTED_PRICE,
  DISCOUNT_BY_RATE,
}

export default ({ price, discountedPrice, discountRate }: Props) => {
  const [mode, setMode] = useState<DiscountState>(() => {
    switch ([!!discountedPrice, !!discountRate]) {
      case [false, false]:
        return DiscountState.NO_DISCOUNT
      case [true, false]:
        return DiscountState.DISCOUNTED_PRICE
      case [false, true]:
        return DiscountState.DISCOUNT_BY_RATE
      case [true, true]:
        return DiscountState.DISCOUNTED_PRICE
    }
    return DiscountState.NO_DISCOUNT
  })
  const [calculatedRate, setRate] = useState<number | undefined>(undefined)
  const [calculatedPrice, setPrice] = useState<number | undefined>(undefined)
  const dispatch = useContext(DispatchContext)

  return (
    <FormSection>
      <SectionHead>Price</SectionHead>
      <FormGroup>
        <Label htmlFor='price'>Price</Label>
        <FormInput
          id='price'
          type='number'
          value={price}
          placeholder='price'
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'CHANGE_PRICE', price: parseFloat(event!.target!.value) })
          }}
        />
      </FormGroup>
      <FormGroup>
        <select
          value={mode}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setMode(parseInt(event!.target!.value, 10))
          }}
        >
          <option value={DiscountState.NO_DISCOUNT}>No discount</option>
          <option value={DiscountState.DISCOUNTED_PRICE}>Discounted price</option>
          <option value={DiscountState.DISCOUNT_BY_RATE}>Discout by rate</option>
        </select>
        {mode === DiscountState.DISCOUNTED_PRICE ? (
          <>
            <Label htmlFor='discountedPrice'>Discounted Price</Label>
            <FormInput
              id='discountedPrice'
              type='number'
              placeholder='discounted price'
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newPrice = parseFloat(event!.target!.value)
                dispatch({ type: 'CHANGE_DISCOUNTED_PRICE', discountedPrice: newPrice })
                setPrice(undefined)
                setRate(((price - newPrice) / price) * 100)
              }}
            />
            <div>{calculatedRate ? `${round(calculatedRate, 1)}% off` : ''}</div>
          </>
        ) : mode === DiscountState.DISCOUNT_BY_RATE ? (
          <>
            <Label htmlFor='discountRate'>Discount Rate</Label>
            <FormInput
              id='discountRate'
              type='text'
              placeholder='discount rate'
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const newRate = parseFloat(event!.target!.value)
                dispatch({ type: 'CHANGE_DISCOUNT_RATE', discountRate: newRate })
                setRate(undefined)
                setPrice((price * (100 - newRate)) / 100)
              }}
            />
            <div>{calculatedPrice ? `Price: $${round(calculatedPrice, 2)}` : ''}</div>
          </>
        ) : null}
      </FormGroup>
    </FormSection>
  )
}

function round(value: number, precision: number) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

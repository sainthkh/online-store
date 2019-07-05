import React from 'react'
import { styled } from '@beanovia/theme'
import { Button } from '../Button'

export default () => {
  return (
    <Sizes>
      <Button>Add Size</Button>
    </Sizes>
  )
}

const Sizes = styled.div({})

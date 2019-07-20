import React from 'react'
import { FormGroup, Label, FormSection, SectionHead, FormInput } from '../components/Form'
import { Button } from '../components/Button'
import { styled } from '@beanovia/theme'

export default () => {
  return (
    <FormSection>
      <SectionHead>Publish</SectionHead>
      <Options>
        <ButtonWrapTop>
          <Button>Save Draft</Button>
          <PreviewButton>Preview</PreviewButton>
        </ButtonWrapTop>
        <OptionWrap>
          Status:{' '}
          <select>
            <option>draft</option>
            <option>published</option>
          </select>
        </OptionWrap>
        <OptionWrap>
          Visibility:{' '}
          <select>
            <option>public</option>
            <option>unlisted</option>
            <option>private</option>
          </select>
        </OptionWrap>
        <OptionWrap>
          Revisions: <span>6</span>
        </OptionWrap>
        <OptionWrap>Published on Date</OptionWrap>
      </Options>
      <ButtonWrapBottom>
        <Button>Archive</Button>
        <SaveButton>Publish</SaveButton>
      </ButtonWrapBottom>
    </FormSection>
  )
}

const ButtonWrapTop = styled.div(({ theme: { spacing } }) => ({
  display: 'flex',
  marginBottom: spacing.small,
}))

const PreviewButton = styled(Button)(({ theme: { spacing } }) => ({
  marginLeft: 'auto',
}))

const Options = styled.div(({ theme: { spacing } }) => ({
  marginBottom: spacing.small,
}))

const OptionWrap = styled.div(({ theme: { spacing } }) => ({
  marginBottom: spacing.tiny,
}))

const ButtonWrapBottom = styled.div(({ theme: { spacing } }) => ({
  display: 'flex',
}))

const SaveButton = styled(Button)(({ theme: { colors } }) => ({
  background: colors.primary,
  color: colors.white,
  marginLeft: 'auto',

  ':hover': {
    background: colors.primary_dark,
  },
}))

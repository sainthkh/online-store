import { styled } from '@beanovia/theme'

export const FormGroup = styled.div({
  width: '100%',
})

export const Label = styled.label(({ theme: { spacing, text } }) => ({
  display: 'block',
  ...text.h3,
  marginTop: spacing.small,
  marginBottom: spacing.small,
}))

export const FormSection = styled.section(({ theme: { colors, spacing, text } }) => ({
  background: colors.white,
  padding: spacing.small,
  border: `1px solid ${colors.gray_dark}`,
  borderRadius: spacing.xtiny,

  label: {
    ...text.regular,
  },
}))

export const SectionHead = styled.h3(({ theme: { text } }) => ({
  ...text.large,
  marginTop: 0,
}))

export const FormInput = styled.input(({ theme: { spacing, text } }) => ({
  width: '100%',
  boxSizing: 'border-box',
  padding: `${spacing.tiny}px ${spacing.small}px`,
  ...text.large,
}))

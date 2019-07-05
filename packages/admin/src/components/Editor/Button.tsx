import { styled } from '@beanovia/theme'

export const Button = styled.button(({ theme: { colors, spacing, text } }) => ({
  border: 'none',
  borderRadius: 3,
  padding: `${spacing.tiny}px ${spacing.small}px`,
  background: colors.primary,
  color: colors.white,
  boxShadow: `1px 1px 3px 1px ${colors.gray_darker}`,
  cursor: 'pointer',
  ...text.regular,

  ':hover': {
    background: colors.primary_dark,
  },
}))

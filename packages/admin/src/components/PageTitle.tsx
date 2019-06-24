import { styled } from '@beanovia/theme';

export default styled.h1(({ theme: { text }}) => ({
  ...text.h1,
}));
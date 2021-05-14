import { ArrowText, ArrowTextProps } from '../ArrowText'

export const ArrowTo = (props: Omit<ArrowTextProps, 'children'>) => (
  <ArrowText {...props}>To</ArrowText>
)

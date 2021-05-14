import { ArrowText, ArrowTextProps } from '../ArrowText'

export const ArrowFrom = (props: Omit<ArrowTextProps, 'children'>) => (
  <ArrowText {...props}>From</ArrowText>
)

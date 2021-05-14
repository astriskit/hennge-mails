import { ArrowText, ArrowTextProps } from '../ArrowText'

export const ArrowDate = (props: Omit<ArrowTextProps, 'children'>) => (
  <ArrowText {...props}>Date</ArrowText>
)

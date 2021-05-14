import { ArrowText, ArrowTextProps } from '../ArrowText'

export const ArrowSubject = (props: Omit<ArrowTextProps, 'children'>) => (
  <ArrowText {...props}>Subject</ArrowText>
)

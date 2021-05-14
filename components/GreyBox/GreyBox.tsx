import cx from 'classnames'
import styles from './GreyBox.module.scss'

interface GreyBoxProps extends React.HTMLProps<HTMLDivElement> {}

export const GreyBox = ({ className = '', ...props }: GreyBoxProps) => (
  <div {...props} className={cx(styles.greyBox, className)} />
)

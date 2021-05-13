import { format, isToday, isThisYear } from 'date-fns'
import cx from 'classnames'
import styles from './EmailDate.module.scss'

interface EmailDateProps {
  children: number | string
  className?: string
}

export const EmailDate = ({ children, className = '' }: EmailDateProps) => {
  const dt = new Date(children)
  let fDt = format(dt, 'dd/MM/yyyy')
  if (isToday(dt)) {
    fDt = format(dt, 'H:mm')
  } else if (isThisYear(dt)) {
    fDt = format(dt, 'MMM dd')
  }
  return <div className={cx(styles.emailDate, className)}>{fDt}</div>
}

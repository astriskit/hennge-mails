import cx from 'classnames'

import styles from './Results.module.scss'

interface ResultsProps {
  children: number | string
  className?: string
}

export const Results = ({ children, className }: ResultsProps) => (
  <div className={cx(styles.results, className)}>
    <span className={styles.title}>Results:&nbsp;&nbsp;</span>
    <span className={styles.body}>{children}</span>
    <span className={styles.suffix}>mail(s)</span>
  </div>
)

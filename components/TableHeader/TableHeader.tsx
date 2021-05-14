import cx from 'classnames'
import { ArrowDate } from '../ArrowDate'
import { ArrowFrom } from '../ArrowFrom'
import { ArrowSubject } from '../ArrowSubject'

import { ArrowText } from '../ArrowText'
import { ArrowTo } from '../ArrowTo'

import styles from './TableHeader.module.scss'

interface TableHeaderProps {
  className?: string
}

const VerticalDivider = ({ className = '' }) => (
  <span className={className}>|</span>
)

export const TableHeader = ({ className = '' }: TableHeaderProps) => (
  <div className={cx(styles.tableHeader, className)}>
    <ArrowFrom type="down" active />
    <VerticalDivider className={styles.divider} />
    <ArrowTo />
    <VerticalDivider className={styles.divider} />
    <ArrowSubject />
    <VerticalDivider className={styles.divider} />
    <ArrowDate />
  </div>
)
